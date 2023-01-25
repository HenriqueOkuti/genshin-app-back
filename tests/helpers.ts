import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { prisma } from '../source/config/index';
import { createUser } from './factories/authentication.factory';

export async function cleanDb() {
  await prisma.session.deleteMany({});

  await prisma.taskInfo.deleteMany({});
  await prisma.tasks.deleteMany({});
  await prisma.userTasks.deleteMany({});
  await prisma.backpackInfo.deleteMany({});
  await prisma.userBackpack.deleteMany({});
  await prisma.bossGems.deleteMany({});
  await prisma.gems.deleteMany({});
  await prisma.users.deleteMany({});

  await prisma.weeklyBossGems.deleteMany({});
  await prisma.elements.deleteMany({});
  await prisma.userCharacters.deleteMany({});
  await prisma.bossMats.deleteMany({});
  await prisma.bosses.deleteMany({});
  await prisma.region.deleteMany({});
  await prisma.weeklyBosses.deleteMany({});
  await prisma.localSpecialty.deleteMany({});
  await prisma.characters.deleteMany({});
  await prisma.characterAscensions.deleteMany({});
  await prisma.characterConstellations.deleteMany({});
  await prisma.dungeons.deleteMany({});
  await prisma.weapons.deleteMany({});
  await prisma.dungeonMats.deleteMany({});
  await prisma.enemyMats.deleteMany({});
  await prisma.enemies.deleteMany({});
  await prisma.themeHexes.deleteMany({});
  await prisma.themes.deleteMany({});
}

export async function generateValidToken(user?: Users) {
  const usedUser = user || (await generateUser());
  const token = jwt.sign({ userId: usedUser.id }, process.env.JWT_SECRET);
  return token;
}

export async function generateUser() {
  const hashedPassword = await bcrypt.hash(faker.internet.password(6), 10);
  const newUserData = {
    email: faker.internet.email(),
    password: hashedPassword,
  };

  return await createUser(newUserData.email, newUserData.password);
}

export async function generateSession(userId: number, token: string) {
  return await prisma.session.create({
    data: {
      userId: userId,
      token: token,
      updatedAt: new Date(),
    },
  });
}
