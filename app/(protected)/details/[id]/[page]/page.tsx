import { Anonymity, Mood, Poll, PollType, Vote } from '@prisma/client';
import { db } from '@/libs/db';
import PollDetailsCard from 'components/shared/PollDetailsCard';
import PreviewCheckbox from 'components/shared/PreviewCheckbox';
import React from 'react';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import MoodDisplay from '@/components/MoodDisplay';
import PollProgressBar from '@/components/PollProgressBar';

interface FullPollInfo extends Poll {
  votes: Vote[];
  _count: {
    participants: number;
  };
}

async function getPoll(pollId: number, userId: number) {
  const poll = await db.poll.findUniqueOrThrow({
    where: {
      id: pollId,
    },
    include: {
      _count: {
        select: { participants: true },
      },
      votes: {},
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

function parsePollData(pollData: FullPollInfo): {
  title: string;
  body: string | React.JSX.Element;
  note?: string;
}[][] {
  const moods = pollData.votes.map(vote =>
    Object.keys(Mood).indexOf(vote.mood)
  );
  const averageMood =
    moods.reduce((partialSum, mood) => partialSum + mood, 0) / moods.length;
  const avgMoodDescription =
    Object.keys(Mood)[Math.trunc(averageMood * 1.24)]?.toLowerCase();
  const parsedPoll = [
    [
      {
        title: 'Poll Question',
        body: pollData.question.substring(0, 40) + '?',
      },
      {
        title: 'Poll Description',
        body: pollData.description || 'No description.',
      },
    ],
    [
      { title: 'Poll created on', body: pollData.createdAt.toString() },
      { title: 'Poll closes on', body: pollData.endDateTime.toString() },

      {
        title: 'Anonymity level',
        body: describeAnonLvl(
          Object.keys(Anonymity).indexOf(pollData.anonymity),
          pollData.quorum
        ),
      },
    ],
    [
      {
        title: 'Poll progress',
        body: (
          <>
            <p className="mb-2">
              {pollData.votes.length} out of {pollData._count.participants}{' '}
              participants voted.
            </p>
            <PollProgressBar
              votes={pollData.votes.length}
              participants={pollData._count.participants}
            />
          </>
        ),
      },
      {
        title: 'Emotional Feedback',
        body: (
          <div>
            <p>
              The average mood participants had while voting on this poll is{' '}
              <span
                className={
                  'font-bold ' +
                  (Math.trunc(averageMood * 1.25) === 0
                    ? 'text-red'
                    : Math.trunc(averageMood * 1.25) === 1
                    ? 'text-peach'
                    : Math.trunc(averageMood * 1.25) === 2
                    ? 'text-yellow'
                    : Math.trunc(averageMood * 1.25) === 3
                    ? 'text-green-light'
                    : 'text-green')
                }
              >
                {avgMoodDescription}
              </span>
              .
            </p>
            <MoodDisplay averageMood={averageMood} />
          </div>
        ),
      },
    ],
    [
      {
        title: 'Poll type',
        body: pollTypeDescriptions[
          Object.keys(PollType).indexOf(pollData.type)
        ]!,
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
    ],
  ];
  return parsedPoll;
}

async function PollDetails({
  params,
}: {
  params: { id: string; page: string };
}) {
  if (parseInt(params.page) <= 0 || parseInt(params.page) > 4) {
    throw new Error('Invalid page number.');
  }
  let userId = 10; //default user if no user is logged in
  const session = await getServerSession(authOptions);
  if (session && session.user.id) {
    userId = session.user.id;
  }
  const poll = await getPoll(parseInt(params.id), userId);
  const parsedPoll = parsePollData(poll);
  return (
    <div className="flex flex-col gap-4 mt-2">
      {parsedPoll[parseInt(params.page) - 1]!.map((pollItem, index) => {
        return (
          <PollDetailsCard
            title={pollItem.title}
            key={index}
            note={pollItem.note}
            bodyMaxH="230px"
          >
            {pollItem.body}
          </PollDetailsCard>
        );
      })}
    </div>
  );
}

export default PollDetails;
