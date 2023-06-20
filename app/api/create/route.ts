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
    const validData = NewPollSchema.parse(data);

    const prismaData = {
      hello: 123,
    };

    return new Response(JSON.stringify(prismaData), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
