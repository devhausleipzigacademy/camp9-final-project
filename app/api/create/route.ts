import { PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { authOptions } from '@/libs/auth';

import {
  CreateNewPoll,
  CreateNewPollSchema,
} from '@/types/newPoll/CreatePollSchema';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = (await request.json()) as CreateNewPoll;

  const session = await getServerSession(authOptions);

  try {
    throw new Error('test');

    const newDate = new Date(data.endDateTime);

    data.endDateTime = newDate;

    CreateNewPollSchema.parse(data);

    const createdPoll = await prisma.poll.create({
      data: {
        question: data.question,
        description: data.description,
        options: data.options.map(option => option.option),
        creator: {
          connect: {
            id: session?.user.id,
          },
        },
        participants: {
          connect: data.participants?.map(participant => ({
            name: participant,
          })),
        },
        endDateTime: data.endDateTime,
        anonymity: data.anonymity,
        quorum: data.quorum ? +data.quorum : 0,
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
