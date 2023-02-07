import { prisma } from '../../source/config/index';
import faker from '@faker-js/faker';
import {
  createWeeklyBossMats,
  createBossMats,
  createRegion,
  createDungeon,
  createDungeonMats,
  createLocalSpecialty,
} from './characters.factory';
import { TaskInfo, TempItems } from '@prisma/client';

export async function createUserTask(userId: number) {
  const userTask = await prisma.tasks.create({
    data: {
      name: faker.internet.userName(),
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: faker.internet.url(),
    },
  });

  const weeklyBossMat = await createWeeklyBossMats();
  await prisma.taskInfo.create({
    data: {
      weeklyBossMat: true,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      taskId: userTask.id,
      itemId: weeklyBossMat.id,
      quantity: 10,
    },
  });

  const bossMat = await createBossMats();
  await prisma.taskInfo.create({
    data: {
      weeklyBossMat: false,
      bossMat: true,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      taskId: userTask.id,
      itemId: bossMat.id,
      quantity: 10,
    },
  });

  const region = await createRegion();
  const dungeon = await createDungeon(region.id);
  const dungeonMat = await createDungeonMats(dungeon.id);
  await prisma.taskInfo.create({
    data: {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      taskId: userTask.id,
      itemId: dungeonMat.id,
      quantity: 10,
    },
  });

  const enemyMat = await prisma.enemyMats.create({
    data: {
      name: faker.internet.userName(),
      key: faker.internet.userName(),
      rarity: 1,
    },
  });
  await prisma.taskInfo.create({
    data: {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: true,
      taskId: userTask.id,
      itemId: enemyMat.id,
      quantity: 10,
    },
  });

  const localSpecialty = await createLocalSpecialty();
  await prisma.taskInfo.create({
    data: {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: true,
      taskId: userTask.id,
      itemId: localSpecialty.id,
      quantity: 10,
    },
  });

  const items = await prisma.taskInfo.findMany({
    where: {
      taskId: userTask.id,
    },
  });

  const taskList = {
    userId: userId,
    taskId: userTask.id,
    name: userTask.name,
    createdAt: userTask.createdAt,
    updatedAt: userTask.updatedAt,
    image: userTask.image,
    items: items,
  };

  return taskList;
}

export type taskList = {
  userId: number;
  taskId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  items: TaskInfo[];
};

export async function createNewUserTaskBody() {
  const weeklyBossMat = await createWeeklyBossMats();
  const item1 = {
    weeklyBossMat: true,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: weeklyBossMat.id,
    quantity: 10,
  };

  const bossMat = await createBossMats();
  const item2 = {
    weeklyBossMat: false,
    bossMat: true,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: bossMat.id,
    quantity: 10,
  };

  const region = await createRegion();
  const dungeon = await createDungeon(region.id);
  const dungeonMat = await createDungeonMats(dungeon.id);
  const item3 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: true,
    enemyMat: false,
    localSpecialty: false,
    itemId: dungeonMat.id,
    quantity: 10,
  };

  const enemyMat = await prisma.enemyMats.create({
    data: {
      name: faker.internet.userName(),
      key: faker.internet.userName(),
      rarity: 1,
    },
  });
  const item4 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: enemyMat.id,
    quantity: 10,
  };

  const localSpecialty = await createLocalSpecialty();
  const item5 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: localSpecialty.id,
    quantity: 10,
  };

  const items = [item1, item2, item3, item4, item5];

  const newTaskBody = {
    name: faker.internet.userName(),
    image: faker.internet.url(),
    items: items,
  };

  return newTaskBody;
}

export async function createNewUserInvalidTaskBody() {
  const weeklyBossMat = await createWeeklyBossMats();
  const item1 = {
    weeklyBossMat: true,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: weeklyBossMat.id,
    quantity: 0,
  };

  const bossMat = await createBossMats();
  const item2 = {
    weeklyBossMat: false,
    bossMat: true,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: bossMat.id,
    quantity: 0,
  };

  const region = await createRegion();
  const dungeon = await createDungeon(region.id);
  const dungeonMat = await createDungeonMats(dungeon.id);
  const item3 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: true,
    enemyMat: false,
    localSpecialty: false,
    itemId: dungeonMat.id,
    quantity: 0,
  };

  const enemyMat = await prisma.enemyMats.create({
    data: {
      name: faker.internet.userName(),
      key: faker.internet.userName(),
      rarity: 1,
    },
  });
  const item4 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: enemyMat.id,
    quantity: 0,
  };

  const localSpecialty = await createLocalSpecialty();
  const item5 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: localSpecialty.id,
    quantity: 0,
  };

  const items = [item1, item2, item3, item4, item5];

  const newTaskBody = {
    name: faker.internet.userName(),
    image: faker.internet.url(),
    items: items,
  };

  return newTaskBody;
}

export async function invalidModifyUserTask(oldTask: taskList) {
  const oldTaskItems: TaskInfo[] = oldTask.items;
  const newTaskItems: TaskInfo[] = [];

  for (let i = 0; i < oldTaskItems.length; i++) {
    const oldItem = oldTaskItems[i];
    const newItem = { ...oldItem, quantity: 0 };
    newTaskItems.push(newItem);
  }

  const modifiedTask: taskList = { ...oldTask, items: newTaskItems };
  return modifiedTask;
}

export async function validModifyUserTask(oldTask: taskList) {
  const oldTaskItems: TaskInfo[] = oldTask.items;
  const newTaskItems: TaskInfo[] = [];

  for (let i = 0; i < oldTaskItems.length; i++) {
    const oldItem = oldTaskItems[i];
    const newItem = { ...oldItem, quantity: oldTaskItems[i].quantity + 1 };
    newTaskItems.push(newItem);
  }

  const modifiedTask: taskList = { ...oldTask, items: newTaskItems };
  return modifiedTask;
}

export function createTempTaskPOSTBody(userId: number) {
  return {
    userId: userId,
    name: faker.internet.userName(),
    image: faker.internet.url(),
    isPost: true,
    isPut: false,
  };
}

export function createTempTaskPUTBody(userId: number, originalTaskId: number) {
  return {
    userId: userId,
    name: faker.internet.userName(),
    image: faker.internet.url(),
    isPost: true,
    isPut: false,
    originalTaskId: originalTaskId,
  };
}

export async function createTempTransactionPOST(userId: number) {
  return await prisma.tempTransaction.create({
    data: {
      userId: userId,
      name: faker.internet.userName(),
      image: faker.internet.url(),
      isPost: true,
      isPut: false,
    },
  });
}

export async function createTempTransactionPUT(userId: number, originalTaskId: number) {
  return await prisma.tempTransaction.create({
    data: {
      userId: userId,
      name: faker.internet.userName(),
      image: faker.internet.url(),
      isPost: false,
      isPut: true,
      originalTaskId: originalTaskId,
    },
  });
}

export async function createNewTempItems() {
  const weeklyBossMat = await createWeeklyBossMats();
  const item1 = {
    weeklyBossMat: true,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: weeklyBossMat.id,
    quantity: 10,
    weaponMat: false,
    name: weeklyBossMat.name,
    key: weeklyBossMat.key,
    rarity: weeklyBossMat.rarity,
  };

  const bossMat = await createBossMats();
  const item2 = {
    weeklyBossMat: false,
    bossMat: true,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: false,
    itemId: bossMat.id,
    quantity: 10,
    weaponMat: false,
    name: bossMat.name,
    key: bossMat.key,
    rarity: bossMat.rarity,
  };

  const region = await createRegion();
  const dungeon = await createDungeon(region.id);
  const dungeonMat = await createDungeonMats(dungeon.id);
  const item3 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: true,
    enemyMat: false,
    localSpecialty: false,
    itemId: dungeonMat.id,
    quantity: 10,
    weaponMat: false,
    name: dungeonMat.name,
    key: dungeonMat.key,
    rarity: dungeonMat.rarity,
  };

  const enemyMat = await prisma.enemyMats.create({
    data: {
      name: faker.internet.userName(),
      key: faker.internet.userName(),
      rarity: 1,
    },
  });
  const item4 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: enemyMat.id,
    quantity: 10,
    weaponMat: false,
    name: enemyMat.name,
    key: enemyMat.key,
    rarity: enemyMat.rarity,
  };

  const localSpecialty = await createLocalSpecialty();
  const item5 = {
    weeklyBossMat: false,
    bossMat: false,
    dungeonMat: false,
    enemyMat: false,
    localSpecialty: true,
    itemId: localSpecialty.id,
    quantity: 10,
    weaponMat: false,
    name: localSpecialty.name,
    key: localSpecialty.key,
    rarity: localSpecialty.rarity,
  };

  const items = [item1, item2, item3, item4, item5];
  return items;
}

type itemsType = {
  weeklyBossMat: boolean;
  bossMat: boolean;
  dungeonMat: boolean;
  enemyMat: boolean;
  localSpecialty: boolean;
  itemId: number;
  quantity: number;
  weaponMat: boolean;
  name: string;
  key: string;
  rarity: number;
};

export async function createTempItems(userId: number, items: itemsType[]) {
  const tempItems: TempItems[] = [];

  for (let i = 0; i < items.length; i++) {
    const tempItem = await prisma.tempItems.create({
      data: {
        userId: userId,
        weeklyBossMat: items[i].weeklyBossMat,
        bossMat: items[i].bossMat,
        dungeonMat: items[i].dungeonMat,
        enemyMat: items[i].enemyMat,
        localSpecialty: items[i].localSpecialty,
        weaponMat: items[i].weaponMat,
        itemId: items[i].itemId,
        quantity: items[i].quantity,
        rarity: items[i].rarity,
        name: items[i].name,
        key: items[i].key,
      },
    });

    tempItems.push(tempItem);
  }
}
