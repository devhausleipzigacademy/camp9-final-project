import { PrismaClient } from '@prisma/client';
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
    <div>
      {pendingPolls.map(poll => (
        <p>{poll.description}</p>
      ))}
    </div>
  );
}

export default Pending;
