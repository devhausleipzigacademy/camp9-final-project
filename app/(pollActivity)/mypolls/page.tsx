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
  console.log(myPolls);
  return (
    <>
      {myPolls.map(poll => (
        <PollCard
          key={poll.id}
          endTime={poll.endDateTime}
          results="see results"
          href="#"
        >
          {poll.question}
        </PollCard>
      ))}
    </>
  );
}

export default MyPolls;
