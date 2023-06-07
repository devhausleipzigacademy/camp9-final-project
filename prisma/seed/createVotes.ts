import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export type Poll = {
  title: string;
  description: string;
  question: string;
  options: string[];
  creatorId: number;
  participants: number[];
  endDateTime: Date;
  anonymity: Anonymity;
  type: PollType;
  quorum: number;
};
export enum Anonymity {
  Anonymous = 'Anonymous',
  NonAnonymous = 'NonAnonymous',
  AnonymousUntilQuorum = 'AnonymousUntilQuorum',
}
export enum PollType {
  MultipleChoice = 'MultipleChoice',
  SingleChoice = 'SingleChoice',
}

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function createVotes(num: number, polls: any) {
  const votes = Array.from({ length: num }, () => {
    const pollId = generateRandomNumber(1, num + 1);
    const participants = polls?.[pollId]?.participants;
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
        userId: participants?.[generateRandomNumber(0, 4)],
      },
    });
  });
  return votes;
}
