import { Poll, PrismaClient } from '@prisma/client';
import React from 'react';

const prisma = new PrismaClient();

async function getClosedPolls(userId: string) {
  const filteredClosedPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: parseInt(userId),
        },
      },
    },
    include: {
      votes: true,
      participants: true,
    },
  });
  const updatedClosedPolls = filteredClosedPolls.map(poll => {
    if (poll.votes.length === poll.participants.length) {
      return poll;
    }
    if (poll.endDateTime < new Date()) {
      return poll;
    }
    return null;
  });
  return updatedClosedPolls;
}

async function Closed() {
  const closedPolls = await getClosedPolls('11');

  if (closedPolls === null) {
    return <div>Hi from Loading</div>;
  }

  return (
    <div>
      {closedPolls.map(poll => (
        <p key={poll?.id}>{poll?.description}</p>
      ))}
    </div>
  );
}

export default Closed;
