import { Poll, PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
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
  const closedPolls = filteredClosedPolls.filter(poll => {
    if (
      poll.votes.length === poll.participants.length ||
      poll.endDateTime < new Date()
    ) {
      return true;
    }
    return false;
  });

  return closedPolls;
}

async function Closed() {
  const closedPolls = await getClosedPolls('11');

  if (closedPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center">
        <h1>You dont have closedpolls</h1>
        <img
          src="https://www.boredpanda.com/blog/wp-content/uploads/2022/08/cats-making-funny-faces-pics-630dfbc4b0e10__700.jpg"
          alt="#"
        />
      </div>
    );
  }
  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-scroll h-full w-[85%] scrollbar">
        {closedPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll?.endDateTime}
            results="see results"
            href="/closed"
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}

export default Closed;