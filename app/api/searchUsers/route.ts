import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/db';
import { z, ZodError } from 'zod';

type SearchUserParams = {
  queryString: string;
  participants: string;
};

interface IRequest extends NextRequest {
  json: () => Promise<SearchUserParams>;
}

export async function GET(request: IRequest) {
  const params = new URL(request.nextUrl).searchParams;
  const queryString = params.get('queryString');
  const hasParticipants = params.has('participants');
  const alreadySelected = hasParticipants ? params.get('participants') : '';

  if (queryString !== null) {
    const users = await db.user.findMany({
      where: {
        name: {
          contains: queryString.toLowerCase(),
          notIn: alreadySelected!.split(','),
        },
      },
    });

    try {
      return NextResponse.json(users, {
        status: 200,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }

      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
