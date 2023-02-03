import { tasksErrors } from '@/errors';
import { fixedTasksType, itemsRepository, modifiedTaskBody, newTaskBody, tasksRepository } from '@/repositories';

async function handleFetchUserTasks(userId: number) {
  //search and return
  const fixedTasks: fixedTasksType = await tasksRepository.findUserTasks(userId);
  const tasksWithItemInfo = [];
  for (let i = 0; i < fixedTasks.length; i++) {
    const task = fixedTasks[i];
    const oldItems = task.items;
    const newItems = [];

    for (let j = 0; j < oldItems.length; j++) {
      const item = oldItems[j];

      let itemInfo = null;
      if (item.weeklyBossMat) {
        itemInfo = await itemsRepository.getWeeklyBossMatInfo(item.itemId);
      }
      if (item.bossMat) {
        itemInfo = await itemsRepository.getBossMatInfo(item.itemId);
      }
      if (item.dungeonMat) {
        itemInfo = await itemsRepository.getDungeonMatInfo(item.itemId);
      }
      if (item.enemyMat) {
        itemInfo = await itemsRepository.getEnemyMatInfo(item.itemId);
      }
      if (item.localSpecialty) {
        itemInfo = await itemsRepository.getLocalSpecialtyInfo(item.itemId);
      }
      newItems.push({ ...item, itemInfo: itemInfo });
      //
    }

    const updatedTask = { ...task, items: newItems };
    tasksWithItemInfo.push(updatedTask);
  }

  return tasksWithItemInfo;
}

async function handleInsertUserTask(userId: number, newTask: newTaskBody) {
  const inserted = await tasksRepository.insertUserTask(userId, newTask);

  if (inserted) {
    return true;
  } else {
    //replace with throw error
    return false;
  }
}

async function updateUserTask(userId: number, updatedTask: modifiedTaskBody) {
  const previousTask = await tasksRepository.findUserSpecificTask(updatedTask.taskId);

  if (!previousTask) {
    throw tasksErrors.NotFoundError();
  }

  if (previousTask.userId !== userId) {
    throw tasksErrors.ConflictError();
  }

  const updated = await tasksRepository.updateUserTask(updatedTask);

  if (updated) {
    return true;
  } else {
    return false;
  }
}

async function deleteUserTask(userId: number, taskId: number) {
  const existingTask = await tasksRepository.findUserSpecificTask(taskId);

  if (!existingTask) {
    throw tasksErrors.NotFoundError();
  }

  if (existingTask.userId !== userId) {
    throw tasksErrors.ConflictError();
  }

  const deleteTask = await tasksRepository.deleteUserTask(taskId);

  return deleteTask;
}

const tasksService = {
  handleFetchUserTasks,
  handleInsertUserTask,
  updateUserTask,
  deleteUserTask,
};

export { tasksService };
