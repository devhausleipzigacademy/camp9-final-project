import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const pollId = searchParams.get('pollId');
  console.log('Backend', userId, pollId);
  return new Response('Hello world');
}
