import { Request, Response } from 'express';

export async function getUserInfo(req: Request, res: Response) {
  console.log(res.locals);
  return res.sendStatus(200);
}
