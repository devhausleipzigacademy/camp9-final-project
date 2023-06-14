import { PrismaClient } from '@prisma/client';
import { PollRequest } from 'app/home/page';
import { now } from 'next-auth/client/_utils';
import { NextRequest, NextResponse } from 'next/server';

interface IRequest extends NextRequest {
  json: () => Promise<PollRequest>;
}

const prisma = new PrismaClient();

export async function GET(request: IRequest) {
  const { searchParams } = await new URL(request.url);
  const userId = searchParams.get('userId') as string;
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
      const filteredPendingPolls = await prisma.vote.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          poll: true,
        },
      });

      const updatedPendingPolls = filteredPendingPolls.map(vote => {
        return vote.poll;
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
            lte: new Date(),
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
        } else {
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

    return NextResponse.json('here are the polls', { status: 201 });
  } catch (err) {
    return NextResponse.json('Failed to load', { status: 422 });
  }
}
