import * as jwt from 'jsonwebtoken';
import { prisma } from '../../source/config/index';

export async function createUser(email: string, password: string) {
  return await prisma.users.create({
    data: {
      email: email,
      password: password,
      updatedAt: new Date(),
    },
  });
}

export async function createSession(userId: number) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
  await prisma.session.create({
    data: {
      userId: userId,
      token: token,
      updatedAt: new Date(),
    },
  });
  return token;
}

export async function findToken(userId: number) {
  return await prisma.session.findFirst({
    where: {
      userId: userId,
    },
  });
}
