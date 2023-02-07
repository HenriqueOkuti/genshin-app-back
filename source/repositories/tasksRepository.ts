import { prisma } from '@/config';
import { TaskInfo } from '@prisma/client';

async function findUserTasks(userId: number) {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId: userId,
    },
  });

  const fixedTasks: fixedTasksType = [];

  for (let i = 0; i < tasks.length; i++) {
    const taskItems = await prisma.taskInfo.findMany({
      where: {
        taskId: tasks[i].id,
      },
    });
    fixedTasks.push({
      ...tasks[i],
      items: taskItems,
      createdAt: JSON.stringify(tasks[i].createdAt),
      updatedAt: JSON.stringify(tasks[i].updatedAt),
    });
  }

  return fixedTasks;
}

export type fixedTasksType = {
  name: string;
  userId: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  items: TaskInfo[];
}[];

async function insertUserTask(userId: number, newTask: newTaskBody) {
  const task = await prisma.tasks.create({
    data: {
      name: newTask.name,
      image: newTask.image,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  for (let i = 0; i < newTask.items.length; i++) {
    const item = newTask.items[i];
    await prisma.taskInfo.create({
      data: {
        weeklyBossMat: item.weeklyBossMat,
        bossMat: item.bossMat,
        dungeonMat: item.dungeonMat,
        enemyMat: item.enemyMat,
        localSpecialty: item.localSpecialty,
        itemId: item.itemId,
        quantity: item.quantity,
        taskId: task.id,
      },
    });
  }

  return true;
}

export type newTaskBody = {
  name: string;
  image: string;
  items: {
    weeklyBossMat: boolean;
    bossMat: boolean;
    dungeonMat: boolean;
    enemyMat: boolean;
    localSpecialty: boolean;
    itemId: number;
    quantity: number;
  }[];
};

async function findUserSpecificTask(taskId: number) {
  return await prisma.tasks.findFirst({
    where: {
      id: taskId,
    },
  });
}

async function updateUserTask(modifiedTask: modifiedTaskBody) {
  let taskId = 0;

  for (let i = 0; i < modifiedTask.items.length; i++) {
    const item = modifiedTask.items[i];
    if (item.taskId) {
      taskId = item.taskId;
      break;
    }
  }

  await prisma.tasks.update({
    where: {
      id: taskId,
    },
    data: {
      name: modifiedTask.name,
      image: modifiedTask.image,
      updatedAt: new Date(),
    },
  });

  const deleteOldTaskInfo = await prisma.taskInfo.deleteMany({
    where: {
      taskId: taskId,
    },
  });

  for (let i = 0; i < modifiedTask.items.length; i++) {
    const item = modifiedTask.items[i];

    await prisma.taskInfo.create({
      data: {
        weeklyBossMat: item.weeklyBossMat,
        bossMat: item.bossMat,
        dungeonMat: item.dungeonMat,
        enemyMat: item.enemyMat,
        localSpecialty: item.localSpecialty,
        itemId: item.itemId,
        quantity: item.quantity,
        taskId: item.taskId,
      },
    });
  }

  return true;
}

export type modifiedTaskBody = {
  userId: number;
  taskId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  items: TaskInfo[];
};

async function deleteUserTask(taskId: number) {
  await prisma.taskInfo.deleteMany({
    where: {
      taskId: taskId,
    },
  });

  await prisma.tasks.delete({
    where: { id: taskId },
  });

  return true;
}

const tasksRepository = {
  findUserTasks,
  insertUserTask,
  findUserSpecificTask,
  updateUserTask,
  deleteUserTask,
};

export { tasksRepository };
