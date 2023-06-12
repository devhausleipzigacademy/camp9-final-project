import { PrismaClient } from '@prisma/client';
import { createPolls } from './seed/createPoll';
import { createVotesForPolls } from './seed/createVotes';

const prisma = new PrismaClient();

async function createMockData() {
  try {
    const numPolls = 5;
    const polls = await createPolls(numPolls);
    const users = await prisma.user.findMany();
    await createVotesForPolls(polls, users);
    console.log('Mock data seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

createMockData();
