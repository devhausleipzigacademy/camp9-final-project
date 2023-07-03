import PollCard from 'components/PollCard';
import React from 'react';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import { db } from '@/libs/db';

async function getPendingPolls() {
  const session = await getServerSession(authOptions);
  const pendingPolls = await db.poll.findMany({
    where: {
      participants: {
        some: {
          id: session?.user.id,
        },
      },
      votes: {
        some: {
          userId: session?.user.id,
        },
      },
      endDateTime: {
        gt: new Date(),
      },
    },
    orderBy: {
      endDateTime: 'asc',
    },
    include: {
      _count: {
        select: {
          participants: true,
          votes: true,
        },
      },
    },
  });
  const pendingPollsNotClosed = pendingPolls.filter(
    poll => poll._count.votes < poll._count.participants
  );
  return pendingPollsNotClosed;
}

async function Pending() {
  const pendingPolls = await getPendingPolls();

  if (pendingPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return pendingPolls.map(poll => (
    <PollCard
      className="mb-4"
      key={poll.id}
      endDate={poll.endDateTime}
      isVoted={true}
      pollId={poll.id}
    >
      {poll?.question}
    </PollCard>
  ));
}

export default Pending;
