import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import React from 'react';
import Image from 'next/image';

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
        <Image
          src="/images/flame-288.gif"
          alt="mypoll"
          width={250}
          height={250}
        ></Image>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-auto h-[318px]w-[85%] scrollbar">
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
