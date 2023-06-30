import { authOptions } from '@/libs/auth';
import { findLastVoteDate, sortPollsByDate } from '@/utils/pollActivityUtils';
import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';
import { getServerSession } from 'next-auth';
import React from 'react';

const prisma = new PrismaClient();

async function getClosedPolls(userId: number) {
  const participatedPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: userId,
        },
      },
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

  const closedPolls = participatedPolls.filter(poll => {
    if (
      poll._count.votes >= poll._count.participants ||
      poll.endDateTime <= new Date()
    ) {
      return true;
    }
    return false;
  });

  return closedPolls;
}

async function Closed() {
  const session = await getServerSession(authOptions);
  const closedPolls = await getClosedPolls(session?.user.id!);

  if (closedPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }
  return sortPollsByDate(closedPolls, session?.user.id!).map(poll => {
    return (
      <PollCard
        className="mb-4"
        key={poll.id}
        endDate={poll.endDateTime}
        isVoted={false}
        pollId={poll.id}
      >
        {poll?.question}
      </PollCard>
    );
  });
}

export default Closed;
