import { createUsers } from './createUsers';
import { PrismaClient, Anonymity, PollType } from '@prisma/client';
import { fakerDE_CH as faker } from '@faker-js/faker';
const prisma = new PrismaClient();

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
export async function createPolls(num: number) {
  const users = await createUsers(num);

  const quorum = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const anonymity = [
    Anonymity.Anonymous,
    Anonymity.NonAnonymous,
    Anonymity.AnonymousUntilQuorum,
  ];
  const types = [PollType.MultipleChoice, PollType.SingleChoice];

  let polls = [];

  for (let i = 0; i < num; i++) {
    const creatorId = users[generateRandomNumber(0, num - 1)]?.id as number;

    const poll = await prisma.poll.create({
      data: {
        description: faker.lorem.paragraph(),
        question: faker.lorem.sentence(),
        options: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        creatorId: creatorId,
        endDateTime: faker.date.future(),
        anonymity: anonymity[generateRandomNumber(0, 2)]!,
        type: types[generateRandomNumber(0, 1)]!,
        quorum: quorum[generateRandomNumber(0, 9)],
      },
    });

    // connect participants
    for (let i = 0; i < 5; i++) {
      const userId = users[generateRandomNumber(0, num - 1)]?.id as number;
      await prisma.poll.update({
        where: { id: poll.id },
        data: {
          participants: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    polls.push(poll);
  }

  return polls;
}
