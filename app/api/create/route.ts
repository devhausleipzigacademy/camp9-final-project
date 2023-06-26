import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';

import {
  CreateNewPoll,
  CreateNewPollSchema,
} from '@/types/newPoll/CreatePollSchema';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = (await request.json()) as CreateNewPoll;
  try {
    CreateNewPollSchema.parse(data);

    const createdPoll = await prisma.poll.create({
      data: {
        question: data.question,
        description: data.description,
        options: data.options?.map(option => option),
        creator: {
          connect: {
            id: 8, // dummy data
          },
        },
        participants: {
          connect: [{ id: 9 }, { id: 10 }], // dummy data
        },
        endDateTime: data.endDateTime,
        anonymity: data.anonymity,
        quorum: +data.quorum,
        type: data.type,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }

    return NextResponse.json('Internal Server Error', { status: 500 });
  }

  return NextResponse.json('Poll created', { status: 201 });
}
