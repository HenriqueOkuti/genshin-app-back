import * as jwt from 'jsonwebtoken';
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

async function newSession(userId: number) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
  return await prisma.session.upsert({
    where: {
      userId: userId,
    },
    create: {
      userId: userId,
      token: token,
    },
    update: {
      token: token,
    },
  });
}

const authRepository = {
  findEmail,
  createUser,
  newSession,
};

export { authRepository };
