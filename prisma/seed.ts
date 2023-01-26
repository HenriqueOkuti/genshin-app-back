import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import allDungeons from './seedData/allDungeons.json';
import allCharacters from './seedData/charactersInfo.json';
import allRegions from './seedData/regions.json';
import allItems from './seedData/itemsNameId.json';

const prisma = new PrismaClient();

async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.taskInfo.deleteMany({});
  await prisma.tasks.deleteMany({});
  await prisma.userTasks.deleteMany({});
  await prisma.backpackInfo.deleteMany({});
  await prisma.userBackpack.deleteMany({});
  await prisma.gems.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.elements.deleteMany({});
  await prisma.userCharacters.deleteMany({});
  await prisma.bossMats.deleteMany({});
  await prisma.region.deleteMany({});
  await prisma.localSpecialty.deleteMany({});
  await prisma.characters.deleteMany({});
  await prisma.characterAscensions.deleteMany({});
  await prisma.characterConstellations.deleteMany({});
  await prisma.dungeons.deleteMany({});
  await prisma.weapons.deleteMany({});
  await prisma.dungeonMats.deleteMany({});
  await prisma.enemyMats.deleteMany({});
  await prisma.themeHexes.deleteMany({});
  await prisma.themes.deleteMany({});
}

//Reads file inside 'Path'
async function readJSON(dir: string) {
  try {
    return await fs.promises.readFile(dir, 'utf8');
  } catch (err) {
    console.error('Error occurred while reading directory!', err);
  }
}
async function insertCharacters() {}

async function insertElements() {
  const elements = [
    {
      name: 'anemo',
      image: '/elements/anemo.png',
    },
    {
      name: 'cryo',
      image: '/elements/cryo.png',
    },
    {
      name: 'dendro',
      image: '/elements/dendro.png',
    },
    {
      name: 'electro',
      image: '/elements/electro.png',
    },
    {
      name: 'geo',
      image: '/elements/geo.png',
    },
    {
      name: 'hydro',
      image: '/elements/hydro.png',
    },
    {
      name: 'pyro',
      image: '/elements/pyro.png',
    },
  ];

  return await prisma.elements.createMany({
    data: elements,
  });
}

async function main() {
  //await cleanDb();

  const dungeons = allDungeons;
  const characters = allCharacters;
  const items = allItems;
  const regions = allRegions;

  //console.log(dungeons);
  //console.log(characters);
  //console.log(items);
  //console.log(regions);

  //insert enemy mats
  //func here

  //insert dungeons
  //func here

  //insert dungeonMats
  //func here

  //insert weapons
  //func here

  //insert characterTalents
  //func here

  //insert characterConstellations
  //func here

  //insert characterAscensions
  //func here

  //insert characters
  //func here

  //insert weeklyBosses
  //func here

  //insert weeklyBossMats
  //func here

  //insert region
  //func here

  //insert localSpecialty
  //func here

  //insert bosses
  //func here

  //insert bossMats
  //func here

  //insert gems
  //func here

  //insert weeklyBossGems
  //func here

  //insert bossGems
  //func here

  //insert enemies
  //func here

  //insert elements
  await insertElements();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
