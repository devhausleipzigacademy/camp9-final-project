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
  //this will be replaced with the session/logged in user once that has been esteblished
  //for now it is hardcoded to user 11
  const pendingPolls = await getPendingPolls('11');

  if (pendingPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-auto h-[318px] w-[85%] scrollbar">
        {pendingPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll.endDateTime}
            details="see details"
            href="/pending"
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}

export default Pending;
