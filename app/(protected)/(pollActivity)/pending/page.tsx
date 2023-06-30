import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';
import React from 'react';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import { sortPollsByDate } from '@/utils/pollActivityUtils';

const prisma = new PrismaClient();

async function getPendingPolls(userId: number) {
  const pendingPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: userId,
        },
      },
      votes: {
        some: {
          userId: userId,
        },
      },
      endDateTime: {
        gt: new Date(),
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

  return pendingPolls;
}

async function Pending() {
  const session = await getServerSession(authOptions);
  const pendingPolls = await getPendingPolls(session?.user.id!);

  if (pendingPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return sortPollsByDate(pendingPolls, session?.user.id!).map(poll => (
    <PollCard
      className="mb-4"
      key={poll.id}
      endDate={poll.endDateTime}
      isVoted={true}
      pollId={poll.id}
    >
      {poll?.question}
    </PollCard>
  ));
}

export default Pending;
