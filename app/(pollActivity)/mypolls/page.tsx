import { PrismaClient } from '@prisma/client';
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
    <div>
      {myPolls.map(poll => (
        <p key={poll.id}>{poll.description}</p>
      ))}
    </div>
  );
}

export default MyPolls;
