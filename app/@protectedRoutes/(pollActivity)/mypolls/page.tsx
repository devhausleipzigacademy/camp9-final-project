import { authOptions } from '@/libs/auth';
import { sortPollsByDate } from '@/utils/pollActivityUtils';
import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';
import { getServerSession } from 'next-auth';
import React from 'react';

const prisma = new PrismaClient();

async function getMyPolls(userId: number) {
  const filteredMyPolls = await prisma.poll.findMany({
    where: {
      creatorId: userId,
    },
    include: {
      _count: {
        select: {
          participants: true,
          votes: true,
        },
      },
      votes: {},
    },
  });
  return filteredMyPolls;
}

async function MyPolls() {
  const session = await getServerSession(authOptions);
  const myPolls = await getMyPolls(session?.user.id!);
  if (myPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return sortPollsByDate(myPolls, session?.user.id!).map(poll => {
    let hasVoted = !!poll.votes.filter(
      vote => vote.userId === session?.user.id!
    ).length;
    return (
      <PollCard
        className="mb-4"
        key={poll.id}
        endDate={poll.endDateTime}
        isVoted={hasVoted}
        pollId={poll.id}
      >
        {poll?.question}
      </PollCard>
    );
  });
}

export default MyPolls;
