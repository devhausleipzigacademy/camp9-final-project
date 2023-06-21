import { NewPollSchema } from '@/types/newPoll/NewPollSchema';
import { Anonymity, PollType } from '@prisma/client';
import { ZodError } from 'zod';

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

      return new Response(JSON.stringify(validData), { status: 200 });
    } else {
      const validationError = validation.error;
      throw validationError;
    }

    // if (!validData.success) {
    //   throw validData.error;
    // }

    // if (validData.success) {
    //   console.log(validData.data);
    // }

    // const prismaData = {
    //   hello: 123,
    // };
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
