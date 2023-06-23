import { db } from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;

  const user = await db.user.findUnique({
    where: {
      id: +id,
    },
  });

  const username = user?.name;
  return NextResponse.json({ username });
}
