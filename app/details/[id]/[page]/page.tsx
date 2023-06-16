import { Anonymity, Poll, PollType, Vote } from '@prisma/client';
import { db } from 'app/libs/db';
import PollDetailsCard from 'components/shared/PollDetailsCard';
import PreviewCheckbox from 'components/shared/PreviewCheckbox';
import React from 'react';

interface FullPollInfo extends Poll {
  votes: Vote[];
  _count: {
    participants: number;
    votes: number;
  };
}

async function getPoll(pollId: number, userId: number) {
  const poll = await db.poll.findUniqueOrThrow({
    where: {
      id: pollId,
    },
    include: {
      _count: {
        select: { participants: true, votes: true },
      },
      votes: {
        where: {
          userId: userId,
        },
      },
    },
  });
  return poll;
}

function describeAnonLvl(lvl: number, quorum: number | null): string {
  switch (lvl) {
    case 0:
      return 'This poll will never reveal the usernames of the participants.';
    case 1:
      return 'This poll will reveal the usernames and votes of participants on poll end.';
    case 2:
      return `On poll end, usernames and votes of participants will be revealed for voting options with at least ${quorum}% of total votes.`;
  }
  return 'Bad input.';
}

const pollTypeDescriptions = [
  'Multiple choice (choose many)',
  'Single choice (choose one)',
];

function parsePollData(pollData: FullPollInfo) {
  const parsedPoll = [
    {
      title: 'Poll Question',
      body: pollData.question.substring(0, 40) + '?',
    },
    {
      title: 'Poll Description',
      body: pollData.description || 'No description.',
    },
    {
      title: 'Anonymity level',
      body: describeAnonLvl(
        Object.keys(Anonymity).indexOf(pollData.anonymity),
        pollData.quorum
      ),
    },
    { title: 'Poll created on', body: pollData.createdAt.toString() },
    { title: 'Poll closes on', body: pollData.endDateTime.toString() },
    {
      title: 'Poll progress',
      body: `${pollData._count.votes} out of ${pollData._count.participants} participants voted.`,
    },
    {
      title: 'Poll type',
      body: pollTypeDescriptions[Object.keys(PollType).indexOf(pollData.type)]!,
    },
    {
      title: pollData.votes[0] ? 'Your vote' : 'Voting options',
      body: (
        <ul className="flex flex-col gap-2 py-1">
          {pollData.options.map((option, index) => (
            <li className="flex gap-2" key={index}>
              <PreviewCheckbox
                type={pollData.type === 'SingleChoice' ? 'radio' : 'check'}
                isChecked={!!pollData.votes[0]?.answer[index]}
              />
              <p>{option}</p>
            </li>
          ))}
        </ul>
      ),
      note: pollData.votes[0]
        ? ''
        : 'You cannot vote on this poll as you are not assigned to it as a participant.',
    },
  ];
  return parsedPoll;
}

async function PollDetails({
  params,
}: {
  params: { id: string; page: string };
}) {
  if (parseInt(params.page) <= 0 || parseInt(params.page) > 3) {
    throw new Error('Invalid page number.');
  }
  const poll = await getPoll(parseInt(params.id), 10);
  const parsedPoll = parsePollData(poll);
  return (
    <div className="flex flex-col gap-4 mt-2">
      {parsedPoll
        .slice((parseInt(params.page) - 1) * 3, parseInt(params.page) * 3)
        .map((pollItem, index) => {
          return (
            <PollDetailsCard
              title={pollItem.title}
              key={index}
              note={pollItem.note}
              bodyMaxH={
                index === 1 && params.page === '1'
                  ? '72px'
                  : pollItem.note
                  ? '184px'
                  : '230px'
              }
            >
              {pollItem.body}
            </PollDetailsCard>
          );
        })}
    </div>
  );
}

export default PollDetails;
