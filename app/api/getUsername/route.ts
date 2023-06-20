import { db } from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(x) {
  const user = await db.user.findUnique({
    where: {
      id: 32, // id of user `qwer`
    },
  });
  return NextResponse.json({ user });
}
