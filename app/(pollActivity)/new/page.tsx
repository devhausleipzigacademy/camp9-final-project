import { PrismaClient } from '@prisma/client';
import React from 'react';

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
    <div>
      {newPolls.map(poll => (
        <p key={poll.id}>{poll.description}</p>
      ))}
    </div>
  );
}

export default New;
