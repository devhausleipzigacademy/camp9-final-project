'use client';
import { Anonymity, PollType } from '@prisma/client';
import PollDetailsCard from 'components/shared/PollDetailsCard';
import PreviewCheckbox from 'components/shared/PreviewCheckbox';
import ProgressBar from 'components/shared/ProgressBar';
import Button from 'components/shared/buttons/Button';
import { PollWithCount, useGetPoll } from 'components/shared/hooks/usePoll';
import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

function describeAnonLvl(lvl: number, quorum: number | null): string {
  switch (lvl) {
    case 0:
      return 'This poll will never reveal the usernames of the participants.';
    case 1:
      return 'This poll will reveal the usernames and votes of participants on poll end.';
    case 2:
      return `This poll will reveal the usernames and votes of participants on poll end for voting options with at least ${quorum}% of total votes.`;
  }
  return 'Bad input.';
}

const pollTypeDescriptions = [
  'Multiple choice (choose many)',
  'Single choice (choose one)',
];

function parsePollData(pollData: PollWithCount) {
  const parsedPoll = [
    {
      title: 'Poll Question',
      body: pollData.question.substring(0, 40) + '?',
    },
    { title: 'Poll Description', body: pollData.description },
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
      body: pollTypeDescriptions[Object.keys(PollType).indexOf(pollData.type)],
    },
    {
      title: 'Voting options',
      body: (
        <ul className="flex flex-col gap-2 py-1">
          {pollData.options.map((option, index) => (
            <li className="flex gap-2" key={index}>
              <PreviewCheckbox />
              <p>{option}</p>
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return parsedPoll;
}

function PollDetails({ params }: { params: { id: string } }) {
  const poll = useGetPoll(parseInt(params.id));
  const [page, setPage] = useState(1);

  let render;
  if (poll.isLoading) {
    return <h3>Loading...</h3>;
  }
  if (poll.isError) {
    return <h3>Error!</h3>;
  }
  if (poll.isSuccess) {
    const parsedPoll = parsePollData(poll.data);
    return (
      <div className="flex flex-col gap-4">
        <ProgressBar variant="tertiary" currentPage={page} numberOfPages={3} />
        {parsedPoll.slice((page - 1) * 3, page * 3).map((pollItem, index) => {
          return (
            <PollDetailsCard title={pollItem.title} key={index}>
              {pollItem.body}
            </PollDetailsCard>
          );
        })}
        <nav className="flex justify-between fixed bottom-[108px] left-0 w-full px-8">
          <Button
            handleClick={() => setPage(oldValue => oldValue - 1)}
            size="small"
            variant="secondary"
          >
            <GrFormPrevious size={24} strokeWidth={2} />
            {page == 1 ? 'Home' : 'Back'}
          </Button>
          <Button
            handleClick={() => setPage(oldValue => oldValue + 1)}
            size="large"
            variant="tertiary"
          >
            {page >= 3 ? 'Home' : 'Next page'}
            <GrFormNext size={24} strokeWidth={2} />
          </Button>
        </nav>
      </div>
    );
  }
}

export default PollDetails;
