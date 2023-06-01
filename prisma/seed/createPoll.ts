const { createUsers } = require('./createUsers');
const { createVotes } = require('./createVotes');
const PrismaClient = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

function generateRandomNumber(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export async function createPoll(num: number) {
  const users = await createUsers(num);
  const endcondition = ['EndDate', 'Quorum', 'NoEnd', 'AllVoted'];
  const anonymity = ['Anonymous', 'NonAnonymous', 'AnonymousUntilQuorum'];
  const type = ['SingleChoice', 'MultipleChoice', 'Open', 'Rating', 'Ranking'];
  const polls = Array.from({ length: num }, () =>
    prisma.poll.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        question: faker.lorem.sentence(),
        options: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ],
        creatorId: users[generateRandomNumber(0, num)].id,
        participants: [
          users[generateRandomNumber(0, num)].id,
          users[generateRandomNumber(0, num)].id,
          users[generateRandomNumber(0, num)].id,
          users[generateRandomNumber(0, num)].id,
          users[generateRandomNumber(0, num)].id,
        ],
        endcondition: endcondition[generateRandomNumber(0, 3)],
        anonymity: anonymity[generateRandomNumber(0, 2)],
        type: type[generateRandomNumber(0, 4)],
        quorum: generateRandomNumber(0, 100),
      },
    })
  );
  createVotes(num, polls);
  return polls;
}
