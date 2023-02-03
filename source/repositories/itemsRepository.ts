import { prisma } from '@/config';

async function getWeeklyBossMats() {
  return await prisma.weeklyBossMats.findMany({});
}

async function getWeeklyBossMatInfo(id: number) {
  return await prisma.weeklyBossMats.findFirst({
    where: {
      id: id,
    },
  });
}

async function getBossMats() {
  return await prisma.bossMats.findMany({});
}

async function getBossMatInfo(id: number) {
  return await prisma.bossMats.findFirst({
    where: {
      id: id,
    },
  });
}

async function getDungeonMats() {
  return await prisma.dungeonMats.findMany({});
}

async function getDungeonMatInfo(id: number) {
  return await prisma.dungeonMats.findFirst({
    where: {
      id: id,
    },
  });
}

async function getEnemyMats() {
  return await prisma.enemyMats.findMany({});
}

async function getEnemyMatInfo(id: number) {
  return await prisma.enemyMats.findFirst({
    where: {
      id: id,
    },
  });
}

async function getLocalSpecialty() {
  return await prisma.localSpecialty.findMany({});
}

async function getLocalSpecialtyInfo(id: number) {
  return await prisma.localSpecialty.findFirst({
    where: {
      id: id,
    },
  });
}

const itemsRepository = {
  getWeeklyBossMats,
  getBossMats,
  getDungeonMats,
  getEnemyMats,
  getLocalSpecialty,
  getWeeklyBossMatInfo,
  getBossMatInfo,
  getDungeonMatInfo,
  getEnemyMatInfo,
  getLocalSpecialtyInfo,
};

export { itemsRepository };
