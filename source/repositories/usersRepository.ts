import { prisma } from '@/config';
import { newInfoType } from '@/services';

async function findUserInfo(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}

async function findUserInfoViaEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
}

async function updateUserInfo(userId: number, newInfo: newInfoType) {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name: newInfo.name,
      image: newInfo.image,
    },
  });
}

const usersRepository = { findUserInfo, findUserInfoViaEmail, updateUserInfo };

export { usersRepository };
