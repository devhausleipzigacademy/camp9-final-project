import { PrismaClient } from '@prisma/client';
import { fakerDE_CH as faker } from '@faker-js/faker';

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
const prisma = new PrismaClient();

async function createVote(pollId: number, userId: number) {
  return prisma.vote.create({
    data: {
      answer: [
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        faker.datatype.boolean(),
        faker.datatype.boolean(),
      ],
      pollId: pollId,
      userId: userId,
    },
  });
}
export async function createVotesForPolls(
  polls: Array<{ id: number }>,
  users: Array<{ id: number }>
) {
  for (let poll of polls) {
    for (let i = 0; i < 5; i++) {
      const userId = users[generateRandomNumber(0, users.length - 1)]
        ?.id as number;
      await createVote(poll.id, userId);
    }
  }
}
