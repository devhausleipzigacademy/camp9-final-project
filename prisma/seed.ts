import { createPoll } from './seed/createPoll';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createMockData() {
  const Polls = await createPoll(100);
  await Promise.all([...Polls]);
}

createMockData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
