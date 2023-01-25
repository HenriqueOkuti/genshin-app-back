import { usersService } from '@/services';
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
