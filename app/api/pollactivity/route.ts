import { PrismaClient } from '@prisma/client';
import { PollRequest } from 'app/home/page';
import { NextRequest, NextResponse } from 'next/server';

interface IRequest extends NextRequest {
  json: () => Promise<PollRequest>;
}

const prisma = new PrismaClient();

export async function POST(request: IRequest) {
  const { userId, filter } = await request.json();
  console.log(userId, filter);
  //new
  //Participating (true)
  //votes (false)

  //pending
  //Participating (true)
  //votes (true)

  //closed
  //all voted || time ended

  //my polls
  //created polls

  try {
    if (filter === 'new') {
      const filteredPolls = await prisma.vote.findMany({
        where: {
          userId: +userId,
        },
        include: {
          poll: true,
        },
      });
      return NextResponse.json(filteredPolls, { status: 201 });
    }

    // const newUser = await db.user.create({
    //   data: {
    //     userName,
    //     password: hashedPassword,
    //   },
    // });
    return NextResponse.json('here are the polls', { status: 201 });
  } catch (err) {
    return NextResponse.json('User already exists', { status: 422 });
  }
}
