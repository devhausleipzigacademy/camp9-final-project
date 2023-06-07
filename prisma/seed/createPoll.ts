import { createUsers } from './createUsers';
import { createVotes } from './createVotes';
import { PrismaClient, User, PollType, Anonymity } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Poll } from './createVotes';
const prisma = new PrismaClient();

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export async function createPoll(num: number) {
  const users: User = await createUsers(num);
  //await Promise.all([...users]);
  const quorum = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const anonymity = [
    Anonymity.Anonymous,
    Anonymity.NonAnonymous,
    Anonymity.AnonymousUntilQuorum,
  ];
  const types = [PollType.MultipleChoice, PollType.SingleChoice];
  const polls: Poll = Array.from({ length: num }, () =>
    prisma.poll.create({
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
        creatorId: users?.[generateRandomNumber(0, num)]?.id as number,
        participants: {
          connect: [
            { id: users?.[generateRandomNumber(0, num)]?.id },
            { id: users?.[generateRandomNumber(0, num)]?.id },
            { id: users?.[generateRandomNumber(0, num)]?.id },
            { id: users?.[generateRandomNumber(0, num)]?.id },
            { id: users?.[generateRandomNumber(0, num)]?.id },
          ],
        },
        endDateTime: faker.date.future(),
        anonymity: anonymity[generateRandomNumber(0, 2)]!,
        type: types[generateRandomNumber(0, 1)]!,
        quorum: quorum?.[generateRandomNumber(0, 9)],
      },
    })
  );
  createVotes(num, polls);
  return polls;
}
