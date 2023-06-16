import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import React from 'react';

const prisma = new PrismaClient();

async function getPendingPolls(userId: string) {
  const filteredPendingPolls = await prisma.vote.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      poll: true,
    },
  });

  const updatedPendingPolls = filteredPendingPolls.map(vote => {
    return vote.poll;
  });
  return updatedPendingPolls;
}

async function Pending() {
  const pendingPolls = await getPendingPolls('11');

  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-scroll h-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-4/5">
        {pendingPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll.endDateTime}
            details="see Details"
            href="#"
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}

export default Pending;
