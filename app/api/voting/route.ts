import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const pollId = searchParams.get('pollId');
  console.log('BACKEND', userId, pollId);
  if (!userId || !pollId) {
    return NextResponse.json('Missing userId or pollId', { status: 400 });
  }

  const filteredNewPolls = await prisma.poll.findUnique({
    where: {
      id: +pollId,
    },
  });
  console.log(filteredNewPolls);
  return NextResponse.json(filteredNewPolls, { status: 200 });
}
