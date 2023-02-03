import { modifiedTaskBody, newTaskBody } from '@/repositories';
import { tasksService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    //  find user tasks
    const tasks = await tasksService.handleFetchUserTasks(+userId);
    //
    //console.log(tasks);

    return res.status(httpStatus.OK).send({ message: null, tasks: tasks });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  const newTask = req.body as newTaskBody;

  try {
    const inserted = await tasksService.handleInsertUserTask(+userId, newTask);

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function putUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  const modifiedTask = req.body as modifiedTaskBody;

  try {
    const updated = await tasksService.updateUserTask(+userId, modifiedTask);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === 'ConflictError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  const { taskId } = req.body;

  try {
    //console.log(taskId);

    if (!taskId || typeof taskId !== 'number') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const deleted = await tasksService.deleteUserTask(+userId, +taskId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === 'ConflictError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
