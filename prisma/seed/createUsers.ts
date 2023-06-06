import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function createUsers(num: number) {
  const users = Array.from(
    { length: num },
    async () =>
      await prisma.user.create({
        data: {
          name: faker.internet.userName(),
          password: faker.internet.password(),
        },
      })
  );
  return users;
}
