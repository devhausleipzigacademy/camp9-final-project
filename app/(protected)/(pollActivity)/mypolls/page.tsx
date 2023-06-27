import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';
import React from 'react';

const prisma = new PrismaClient();

async function getMyPolls(userId: string) {
  const filteredMyPolls = await prisma.poll.findMany({
    where: {
      creatorId: parseInt(userId),
    },
  });
  return filteredMyPolls;
}

async function MyPolls() {
  //this will be replaced with the session/logged in user once that has been esteblished
  //for now it is hardcoded to user 11
  const myPolls = await getMyPolls('11');
  if (myPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return myPolls.map(poll => (
    <PollCard
      className="mb-4"
      key={poll.id}
      endDate={poll.endDateTime}
      isVoted={false}
      isOwner={false}
      pollId={poll.id}
    >
      {poll?.question}
    </PollCard>
  ));
}

export default MyPolls;
