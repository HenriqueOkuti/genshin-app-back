import { newInfoType, usersService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUserInfo(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    const userInfo = await usersService.handleFetchUserInfo(+userId);

    return res.status(httpStatus.OK).send(userInfo);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function putUserInfo(req: Request, res: Response) {
  const { userId } = res.locals;
  const newInfo = req.body as newInfoType;

  try {
    const newUserInfo = await usersService.handleUpdateUserInfo(+userId, newInfo);

    return res.status(httpStatus.OK).send(newUserInfo);
  } catch (error) {
    if (error.name === 'WrongEmail') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'DidNotUpdate') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
