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
import { TaskInfo } from '@prisma/client';

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

  //insert weekly boss mat into list
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

  //insert boss mat into list
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

  //insert dungeon mat into list
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

  //insert enemy mat into list
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

  //insert local specialty into list
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

  //fetches all items from task
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
  //
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
  //insert weekly boss mat into list
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

  //insert boss mat into list
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

  //insert dungeon mat into list
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

  //insert enemy mat into list
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

  //insert local specialty into list
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

  //fetches all items from task
  const items = [item1, item2, item3, item4, item5];

  const newTaskBody = {
    name: faker.internet.userName(),
    image: faker.internet.url(),
    items: items,
  };

  return newTaskBody;
  //
}

export async function createNewUserInvalidTaskBody() {
  //insert weekly boss mat into list
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

  //insert boss mat into list
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

  //insert dungeon mat into list
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

  //insert enemy mat into list
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

  //insert local specialty into list
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

  //fetches all items from task
  const items = [item1, item2, item3, item4, item5];

  const newTaskBody = {
    name: faker.internet.userName(),
    image: faker.internet.url(),
    items: items,
  };

  return newTaskBody;
  //
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
