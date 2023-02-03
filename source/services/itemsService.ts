import { itemsRepository } from '@/repositories';

async function fetchWeeklyBossMats() {
  const weeklyBossMats = await itemsRepository.getWeeklyBossMats();

  return {
    weeklyBossMats: weeklyBossMats,
  };
}

async function fetchBossMats() {
  const bossMats = await itemsRepository.getBossMats();

  return {
    bossMats: bossMats,
  };
}

async function fetchDungeonMats() {
  const dungeonMats = await itemsRepository.getDungeonMats();

  return {
    dungeonMats: dungeonMats,
  };
}

async function fetchEnemyMats() {
  const enemyMats = await itemsRepository.getEnemyMats();

  return {
    enemyMats: enemyMats,
  };
}

async function fetchLocalSpecialty() {
  const localSpecialty = await itemsRepository.getLocalSpecialty();

  return {
    localSpecialty: localSpecialty,
  };
}

async function fetchAll() {
  const weeklyBossMats = await itemsRepository.getWeeklyBossMats();
  const fixedWeeklyBossMats = [];
  for (let i = 0; i < weeklyBossMats.length; i++) {
    fixedWeeklyBossMats.push({ ...weeklyBossMats[i], weeklyBossMat: true });
  }

  const bossMats = await itemsRepository.getBossMats();
  const fixedBossMats = [];
  for (let i = 0; i < bossMats.length; i++) {
    fixedBossMats.push({ ...bossMats[i], bossMat: true });
  }

  const dungeonMats = await itemsRepository.getDungeonMats();
  const fixedDungeonMats = [];
  for (let i = 0; i < dungeonMats.length; i++) {
    fixedDungeonMats.push({ ...dungeonMats[i], dungeonMat: true });
  }

  const enemyMats = await itemsRepository.getEnemyMats();
  const fixedEnemyMats = [];
  for (let i = 0; i < enemyMats.length; i++) {
    fixedEnemyMats.push({ ...enemyMats[i], enemyMat: true });
  }

  const localSpecialty = await itemsRepository.getLocalSpecialty();
  const fixedLocalSpecialty = [];
  for (let i = 0; i < localSpecialty.length; i++) {
    fixedLocalSpecialty.push({ ...localSpecialty[i], localSpecialty: true });
  }

  return {
    weeklyBossMats: fixedWeeklyBossMats,
    bossMats: fixedBossMats,
    dungeonMats: fixedDungeonMats,
    enemyMats: fixedEnemyMats,
    localSpecialty: fixedLocalSpecialty,
  };
}

const itemsService = {
  fetchWeeklyBossMats,
  fetchBossMats,
  fetchDungeonMats,
  fetchEnemyMats,
  fetchLocalSpecialty,
  fetchAll,
};

export { itemsService };
