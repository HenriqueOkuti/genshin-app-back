import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const message: void | string = null;
    //  find user characters
    //

    return res.status(httpStatus.OK).send({ message: message, tasks: [] });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const message: void | string = null;
    //  find user characters
    //

    return res.status(httpStatus.OK).send({ message: message, tasks: [] });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function putUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const message: void | string = null;
    //  find user characters
    //

    return res.status(httpStatus.OK).send({ message: message, tasks: [] });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteUserTasks(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const message: void | string = null;
    //  find user characters
    //

    return res.status(httpStatus.OK).send({ message: message, tasks: [] });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
