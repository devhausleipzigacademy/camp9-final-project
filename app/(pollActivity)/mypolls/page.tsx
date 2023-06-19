import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import React from 'react';

const prisma = new PrismaClient();

async function getMyPolls(userId: string) {
  const filteredMyPolls = await prisma.poll.findMany({
    where: {
      creatorId: parseInt(userId),
    },
  });
  console.log(filteredMyPolls);
  return filteredMyPolls;
}

async function MyPolls() {
  const myPolls = await getMyPolls('11');
  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-scroll h-full w-[85%] scrollbar">
        {myPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll.endDateTime}
            results="see results"
            href="/mypolls"
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}

export default MyPolls;
