import { prisma } from '@/config';

async function findUserInfo(userId: number) {
  return await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}
