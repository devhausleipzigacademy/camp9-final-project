import { authOptions } from '@/libs/auth';
import { sortPollsByDate } from '@/utils/pollActivityUtils';
import PollCard from 'components/PollCard';
import { getServerSession } from 'next-auth';
import React from 'react';
import { db } from '@/libs/db';

async function getMyPolls() {
  const session = await getServerSession(authOptions);
  const filteredMyPolls = await db.poll.findMany({
    where: {
      creatorId: session?.user.id,
    },
    include: {
      _count: {
        select: {
          participants: true,
          votes: true,
        },
      },
      votes: {},
    },
  });
  return filteredMyPolls;
}

async function MyPolls() {
  const myPolls = await getMyPolls();
  if (myPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return sortPollsByDate(myPolls).map(poll => {
    const hasVoted = !!poll.votes.filter(vote => vote.userId === poll.creatorId)
      .length;
    return (
      <PollCard
        className="mb-4"
        key={poll.id}
        endDate={poll.endDateTime}
        isVoted={hasVoted}
        pollId={poll.id}
      >
        {poll?.question}
      </PollCard>
    );
  });
}

export default MyPolls;
