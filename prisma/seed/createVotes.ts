const PrismaClient = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

type Poll = {
  title: string;
  description: string;
  question: string;
  options: string[];
  creatorId: number;
  participants: number[];
  endcondition: number;
  anonymity: number;
  type: number;
  quorum: number;
};

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function createVotes(num: number, poll: Poll[]) {
  const votes = Array.from({ length: num }, () => {
    const pollId = generateRandomNumber(1, num + 1);
    const participants = poll[pollId].participants;
    return prisma.vote.create({
      data: {
        answer: [
          faker.boolean.boolean(),
          faker.boolean.boolean(),
          faker.boolean.boolean(),
        ],
        pollId: pollId,
        user: participants[generateRandomNumber(0, 4)],
      },
    });
  });
  return votes;
}
