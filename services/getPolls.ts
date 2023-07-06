import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import { db } from '@/libs/db';
import { Poll } from '@prisma/client';
import { ExtendedPoll } from '@/types/pollActivity';
import { sortPollsByDate } from '@/utils/pollActivityUtils';

export async function getNewPolls(): Promise<Poll[]> {
  const session = await getServerSession(authOptions);
  let todayInAMinute = new Date();
  todayInAMinute.setMinutes(todayInAMinute.getMinutes() + 1);
  const filteredNewPolls = await db.poll.findMany({
    where: {
      participants: {
        some: {
          id: session?.user.id,
        },
      },
      votes: {
        none: {
          userId: session?.user.id,
        },
      },
      endDateTime: {
        gt: todayInAMinute,
      },
    },
    orderBy: {
      endDateTime: 'asc',
    },
  });

  return filteredNewPolls;
}

export async function getPendingPolls(): Promise<ExtendedPoll[]> {
  const session = await getServerSession(authOptions);
  const pendingPolls = await db.poll.findMany({
    where: {
      participants: {
        some: {
          id: session?.user.id,
        },
      },
      votes: {
        some: {
          userId: session?.user.id,
        },
      },
      endDateTime: {
        gt: new Date(),
      },
    },
    orderBy: {
      endDateTime: 'asc',
    },
    include: {
      _count: {
        select: {
          participants: true,
          votes: true,
        },
      },
      votes: {},
      participants: {},
    },
  });
  const pendingPollsNotClosed = pendingPolls.filter(
    poll => poll._count.votes < poll._count.participants
  );
  return pendingPollsNotClosed;
}

export async function getClosedPolls() {
  const session = await getServerSession(authOptions);
  const participatedPolls = await db.poll.findMany({
    where: {
      participants: {
        some: {
          id: session?.user.id,
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
      participants: {},
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
  return sortPollsByDate(closedPolls);
}

export async function getMyPolls() {
  const session = await getServerSession(authOptions);
  const filteredMyPolls = await db.poll.findMany({
    where: {
      creatorId: session?.user.id,
    },
    include: {
      _count: {
        select: {
          participants: true,
          votes: true,
        },
      },
      votes: {},
      participants: {},
    },
  });
  return sortPollsByDate(filteredMyPolls);
}
