import { VoteAnswer } from '@/components/hooks/usePoll';
import { authOptions } from '@/libs/auth';
import { Mood, Poll, PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { searchParams } = new URL(request.url);
  const pollId = searchParams.get('pollId');

  if (!pollId) {
    return NextResponse.json('Missing userId or pollId', { status: 400 });
  }

  try {
    const votePolls = await prisma.poll.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
        votes: {
          none: {
            userId: userId,
          },
        },
      },
    });

    const filteredVotePolls = votePolls.filter(poll => {
      if (poll.id === parseInt(pollId)) {
        return true;
      }
    });

    const singlePoll = filteredVotePolls[0];
    if (!singlePoll) {
      const succesVote = {
        id: 107000,
        description: 'Estefani & Amir are the best EVAR',
      };
      return NextResponse.json(succesVote, { status: 200 });
    }
    return NextResponse.json(singlePoll, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id!;
  const { answer, mood, pollId } = (await request.json()) as VoteAnswer;

  const moodTyping = mood as keyof typeof Mood;

  try {
    if (answer === undefined || mood === undefined || userId === undefined) {
      return NextResponse.json('Missing ', { status: 400 });
    }
    const createUserVote = await prisma.vote.create({
      data: { answer, mood: moodTyping, pollId, userId },
    });
    return NextResponse.json('Your vote is submitted', { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
