import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import { db } from '@/libs/db';
import { Poll } from '@prisma/client';

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
