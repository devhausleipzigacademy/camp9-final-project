'use client';
import { Anonymity, Poll } from '@prisma/client';
import PollDetailsCard from 'components/shared/PollDetailsCard';
import PreviewCheckbox from 'components/shared/PreviewCheckbox';
import ProgressBar from 'components/shared/ProgressBar';
import { useGetPoll } from 'components/shared/hooks/usePoll';
import React, { useState } from 'react';

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

function parsePollData(pollData: Poll) {
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
    { title: 'Poll progress', body: 'still have to figure this one out!' },
    { title: 'Poll type', body: pollData.type },
    { title: 'Voting options', body: pollData.options },
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
        <nav className="flex justify-between">
          <button onClick={() => setPage(oldValue => oldValue - 1)}>
            back!
          </button>
          <button onClick={() => setPage(oldValue => oldValue + 1)}>
            next!
          </button>
        </nav>
      </div>
    );
  }
}

export default PollDetails;

// <PollDetailsCard title="Your vote">
//                 <ul className="flex flex-col gap-1">
//                   <li className="flex gap-2">
//                     <PreviewCheckbox isChecked={true} />
//                     <p>voting option A</p>
//                   </li>
//                   <li className="flex gap-2">
//                     <PreviewCheckbox />
//                     <p>voting option B</p>
//                   </li>
//                   <li className="flex gap-2">
//                     <PreviewCheckbox />
//                     <p>voting option C</p>
//                   </li>
//                 </ul>
//               </PollDetailsCard>
