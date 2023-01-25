import { prisma } from '../source/config/index';

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

//prisma.users.findMany({});
