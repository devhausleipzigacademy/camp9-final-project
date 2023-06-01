const PrismaClient = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

export async function createUsers(num: number) {
  const users = Array.from({ length: num }, () =>
    prisma.user.create({
      data: {
        name: faker.name.findName(),
        password: faker.internet.password(),
      },
    })
  );
  return users;
}
