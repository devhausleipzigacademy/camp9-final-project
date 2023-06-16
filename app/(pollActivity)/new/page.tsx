import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import React, { Children } from 'react';

const prisma = new PrismaClient();

async function getNewPolls(userId: string) {
  const filteredNewPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: parseInt(userId),
        },
      },
      votes: {
        none: {
          userId: parseInt(userId),
        },
      },
    },
  });
  return filteredNewPolls;
}

async function New() {
  const newPolls = await getNewPolls('11');
  return (
    <div className="overflow-y-scroll w-full min-w-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 ">
      {newPolls.map(poll => (
        <PollCard
          key={poll.id}
          endTime={poll.endDateTime}
          results="see results"
          href="#"
        >
          {poll.question}
        </PollCard>
      ))}
    </div>
  );
}
export default New;
