import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';
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
  //this will be replaced with the session/logged in user once that has been esteblished
  //for now it is hardcoded to user 11
  const closedPolls = await getClosedPolls('11');

  if (closedPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return closedPolls.map(poll => (
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

export default Closed;
