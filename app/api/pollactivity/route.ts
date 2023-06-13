import { PrismaClient } from '@prisma/client';
import { PollRequest } from 'app/home/page';
import { now } from 'next-auth/client/_utils';
import { NextRequest, NextResponse } from 'next/server';

interface IRequest extends NextRequest {
  json: () => Promise<PollRequest>;
}

const prisma = new PrismaClient();

export async function GET(request: IRequest) {
  console.log('request', request);
  const { searchParams } = await new URL(request.url);
  console.log('searchParams', searchParams);
  const userId = searchParams.get('userId') as string;
  console.log('userId', userId);
  const filter = searchParams.get('filter') as string;

  //new
  //Participating (true)
  //votes (false)

  //pending
  //Participating (true)
  //votes (true)

  //closed
  //all voted || time ended

  //my polls
  //created polls

  try {
    if (filter === 'new') {
      const filteredNewPolls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              id: parseInt(userId),
            },
          },
          votes: {
            none: {
              userId: parseInt(userId),
            },
          },
        },
      });
      return NextResponse.json(filteredNewPolls, { status: 201 });
    }

    if (filter === 'pending') {
      const filteredPendingPolls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              id: parseInt(userId),
            },
          },
          votes: {
            some: {
              userId: parseInt(userId),
            },
          },
          endDateTime: {
            gt: new Date(now()),
          },
        },
        include: {
          votes: true,
          participants: true,
        },
      });

      const updatedPendingPolls = filteredPendingPolls.map(poll => {
        if (poll.votes.length < poll.participants.length) {
          return poll;
        }
      });

      return NextResponse.json(updatedPendingPolls, { status: 201 });
    }

    if (filter === 'closed') {
      const filteredClosedPolls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              id: parseInt(userId),
            },
          },
          endDateTime: {
            lte: new Date(now()),
          },
        },
        include: {
          votes: true,
          participants: true,
        },
      });
      const updatedClosedPolls = filteredClosedPolls.map(poll => {
        if (poll.votes.length === poll.participants.length) {
          return poll;
        }
      });

      return NextResponse.json(updatedClosedPolls, { status: 201 });
    }

    if (filter === 'myPolls') {
      const filteredMyPolls = await prisma.poll.findMany({
        where: {
          creatorId: parseInt(userId),
        },
      });
      return NextResponse.json(filteredMyPolls, { status: 201 });
    }

    // const newUser = await db.user.create({
    //   data: {
    //     userName,
    //     password: hashedPassword,
    //   },
    // });
    return NextResponse.json('here are the polls', { status: 201 });
  } catch (err) {
    return NextResponse.json('User already exists', { status: 422 });
  }
}
