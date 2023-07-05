import { getClosedPolls } from '@/services/getPolls';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const polls = await getClosedPolls();
    return NextResponse.json(polls, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
