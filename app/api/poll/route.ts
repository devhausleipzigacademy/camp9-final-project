import { NextRequest, NextResponse } from 'next/server';
import { useParams } from 'next/navigation';
import { db } from 'app/libs/db';

export async function GET(request: NextRequest) {
  const paramsId = request.nextUrl.searchParams.get('id');
  if (!paramsId)
    return NextResponse.json(`No poll id provided in the search query.`, {
      status: 400,
    });
  const pollId = parseInt(paramsId);
  if (Number.isNaN(pollId))
    return NextResponse.json(`The provided poll id must be an integer.`, {
      status: 400,
    });
  try {
    const poll = await db.poll.findUniqueOrThrow({
      where: {
        id: pollId,
      },
      include: {
        _count: {
          select: { participants: true, votes: true },
        },
      },
    });
    return NextResponse.json(poll, { status: 200 });
  } catch (err) {
    return NextResponse.json(`No poll with the id ${pollId} found.`, {
      status: 404,
    });
  }
}
