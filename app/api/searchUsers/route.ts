import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/db';
import { z, ZodError } from 'zod';

type SearchUserParams = {
  queryString: string;
};

interface IRequest extends NextRequest {
  json: () => Promise<SearchUserParams>;
}

export async function GET(request: IRequest) {
  const params = new URL(request.nextUrl).searchParams;
  const queryString = params.get('queryString');
  console.log(queryString);

  /* try {
    const data = await request.json();

    const queryUsersModel = z.object({
      queryString: z.string(),
    });
*/
  //const { queryString } = queryUsersModel.parse(data);
  if (queryString !== null) {
    console.log(queryString);
    const users = await db.user.findMany({
      where: {
        name: {
          contains: queryString!,
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
