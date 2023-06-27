import { VoteAnswer } from '@/app/(protected)/voting/[...slug]/page';
import { Mood, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const pollId = searchParams.get('pollId');
  if (!userId || !pollId) {
    return NextResponse.json('Missing userId or pollId', { status: 400 });
  }

  const filteredNewPolls = await prisma.poll.findUnique({
    where: {
      id: +pollId,
    },
  });
  return NextResponse.json(filteredNewPolls, { status: 200 });
}

export async function POST(request: Request) {
  const { answer, mood, pollId, userId } = (await request.json()) as VoteAnswer;
  console.log(answer, mood, pollId, userId);
  if (answer === undefined || mood === undefined){
    return NextResponse.json('Missing answer', { status: 400 });
  }


  const createUserVote = await prisma.vote.create({
    data: { answer, mood , pollId, userId},
  });

}
