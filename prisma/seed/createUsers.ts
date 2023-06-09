import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function createUsers(num: number) {
  // Generate user data
  const usersData = Array.from({ length: num }, () => ({
    name: faker.internet.userName(),
    password: faker.internet.password(),
  }));

  // Batch create users
  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true, // optional, skips inserting a record if a unique constraint would be violated
  });

  return prisma.user.findMany(); // Returns all users
}
