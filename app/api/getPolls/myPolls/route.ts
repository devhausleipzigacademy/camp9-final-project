import { getMyPolls } from '@/services/getPolls';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const polls = await getMyPolls();
    return NextResponse.json(polls, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
