import { VoteAnswer } from '@/components/hooks/usePoll';
import { authOptions } from '@/libs/auth';
import { Mood, Poll, PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pollId = searchParams.get('pollId');

  const session = await getServerSession(authOptions);

  const serverUser = session?.user.id;
  console.log(serverUser);
  if (!pollId) {
    return NextResponse.json('Missing userId or pollId', { status: 400 });
  }

  const votePolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: serverUser,
        },
      },
      votes: {
        none: {
          userId: serverUser,
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
}

export async function POST(request: Request) {
  const { answer, mood, pollId, userId } = (await request.json()) as VoteAnswer;

  const moodTyping = mood as keyof typeof Mood;

  if (answer === undefined || mood === undefined) {
    return NextResponse.json('Missing answer', { status: 400 });
  }
  const createUserVote = await prisma.vote.create({
    data: { answer, mood: moodTyping, pollId, userId },
  });
  return NextResponse.json('You vote is submited', { status: 201 });
}
