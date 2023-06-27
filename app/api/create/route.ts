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
    const newDate = new Date(data.endDateTime);

    data.endDateTime = newDate;

    CreateNewPollSchema.parse(data);


    const createdPoll = await prisma.poll.create({
      data: {
        question: data.question,
        description: data.description,
        options: data.options?.map(option => option),
        creator: {
          connect: {
            id: data.creator,
          },
        },
        participants: {
          // connect: [{ name: "test" }, { name: "hello" }], // dummy data
          connect: data.participants?.map(participant => ({
            name: participant,
          })),
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
