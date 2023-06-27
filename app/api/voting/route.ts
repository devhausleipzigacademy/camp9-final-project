import { VoteAnswer } from '@/app/(protected)/voting/[...slug]/page';
import { Mood, Poll, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const pollId = searchParams.get('pollId');
  if (!userId || !pollId) {
    return NextResponse.json('Missing userId or pollId', { status: 400 });
  }

  const votePolls = await prisma.poll.findMany({
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

  console.log(votePolls);

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
  console.log(answer, mood, pollId, userId);

  const moodTyping = mood as keyof typeof Mood;

  if (answer === undefined || mood === undefined) {
    return NextResponse.json('Missing answer', { status: 400 });
  }
  const createUserVote = await prisma.vote.create({
    data: { answer, mood: moodTyping, pollId, userId },
  });
  return NextResponse.json('You vote is submited', { status: 201 });
}
