import { PrismaClient } from '@prisma/client';
import { PollRequest } from 'app/home/page';
import { now } from 'next-auth/client/_utils';
import { NextRequest, NextResponse } from 'next/server';

interface IRequest extends NextRequest {
  json: () => Promise<PollRequest>;
}

const prisma = new PrismaClient();

export async function POST(request: IRequest) {
  const { userId, filter } = await request.json();
  console.log(userId, filter);
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
      const filteredNewPolls = await prisma.vote.findMany({
        where: {
          userId: +userId,
        },
        include: {
          poll: true,
        },
      });
      return NextResponse.json(filteredNewPolls, { status: 201 });
    }

    if (filter === 'pending') {
      const filteredPendingPolls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              id: +userId,
            },
          },
          endDateTime: {
            gt: new Date(now()),
          },
        },
        include: {
          votes: true,
        },
      });
      return NextResponse.json(filteredPendingPolls, { status: 201 });
    }

    if (filter === 'closed') {
      const filteredClosedPolls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              id: +userId,
            },
          },
          endDateTime: {
            lte: new Date(now()),
          },
        },
        include: {
          votes: true,
        },
      });
      return NextResponse.json(filteredClosedPolls, { status: 201 });
    }
    
    if (filter === 'myPolls') {
        const filteredMyPolls = await prisma.poll.findMany({
          where: {
            creatorId: +userId,
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
