import { prisma } from '../config/database';

async function findEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
}

async function createUser(email: string, password: string, name: string) {
  return await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
      updatedAt: new Date(),
    },
  });
}

const authRepository = {
  findEmail,
  createUser,
};

export { authRepository };
