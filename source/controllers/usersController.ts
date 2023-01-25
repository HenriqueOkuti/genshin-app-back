import { Request, Response } from 'express';

export async function getUserInfo(req: Request, res: Response) {
  return res.sendStatus(200);
}
