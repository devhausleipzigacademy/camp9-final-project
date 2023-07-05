import { NextResponse } from 'next/server';
import { getNewPolls } from '@/services/getPolls';

export async function GET() {
  try {
    const polls = await getNewPolls();
    return NextResponse.json(polls, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
