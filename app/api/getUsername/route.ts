import { db } from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;
  console.log("BACKEND", id)

  const user = await db.user.findUnique({
    where: {
      id: +id, // id of user `qwer`
    },
  });
  
  const username = user?.name
  return NextResponse.json({ username });
}
