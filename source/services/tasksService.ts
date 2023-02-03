import { tasksErrors } from '@/errors';
import { fixedTasksType, modifiedTaskBody, newTaskBody, tasksRepository } from '@/repositories';

async function handleFetchUserTasks(userId: number) {
  //search and return
  const fixedTasks: fixedTasksType = await tasksRepository.findUserTasks(userId);

  return fixedTasks;
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
