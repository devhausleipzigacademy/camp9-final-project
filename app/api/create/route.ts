import { Anonymity, PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';

import { CreateNewPollSchema } from '@/types/newPoll/CreatePollSchema';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const validation = CreateNewPollSchema.safeParse(data);

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
            quorum: +validData.quorum,
            type: validData.type,
          },
        });

        console.log('Poll created: ', createdPoll);

        return new Response(JSON.stringify(createdPoll), { status: 200 });
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
