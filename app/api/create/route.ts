import { NewPollSchema } from '@/types/newPoll/NewPollSchema';
import { Anonymity, PollType, PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export type POSTReturnType = {
  id: number;
  description?: string;
  question: string;
  options: string[];
  creatorId: number;
  participants: number[];
  endDateTime: string;
  anonymity: Anonymity;
  quorum?: number;
  type: PollType;
  createdAt: string;
  updatedAt: string;
};

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const validation = NewPollSchema.safeParse(data);

    console.log(validation);

    if (validation.success) {
      const validData = validation.data;
      console.log(validData);

      try {
        const createdPoll = await prisma.poll.create({
          // data: {
          //   description: validData.description,
          //   question: validData.question,
          //   options: {
          //     create: validData.options.map(option => ({
          //       option,
          //     })),
          //   },
          //   creator: {
          //     connect: {
          //       id: validData.creatorId,
          //     },
          //   },
          //   participants: {
          //     connect: validData.participants.map(participant => ({
          //       id: participant,
          //     })),
          //   },
          //   endDateTime: validData.endDateTime,
          //   anonymity: validData.anonymity,
          //   quorum: validData.quorum,
          //   type: validData.type,
          // },
          data: {
            question: validData.question,
            description: validData.description,
            options: validData.options?.map(option => option),
            creator: {
              connect: {
                id: 8, // dummy data
              },
            },
            participants: {
              connect: [{ id: 9 }, { id: 10 }], // dummy data
            },
            endDateTime: validData.endDateTime,
            anonymity: Anonymity.Anonymous, // dummy data
            quorum: validData.quorum,
            type: validData.type,
          },
        });

        console.log('Poll created: ', createdPoll);

        return new Response(JSON.stringify(validData), { status: 200 });
      } catch (error) {
        console.error('Error creating poll', error);

        return new Response('Internal Server Error', { status: 500 });
      }
    } else {
      const validationError = validation.error;
      throw validationError;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
