import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function validateTaskValues(req: Request, res: Response, next: NextFunction) {
  const newTask = req.body as newTaskBody;

  if (!newTask.name || !newTask.image) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  if (!newTask.items) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  for (let i = 0; i < newTask.items.length; i++) {
    const item = newTask.items[i];
    if (item.quantity < 1 || Math.round(item.quantity) !== item.quantity) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    let numberOfBools = 0;
    if (typeof item.weeklyBossMat === 'boolean') {
      numberOfBools++;
    }
    if (typeof item.bossMat === 'boolean') {
      numberOfBools++;
    }
    if (typeof item.dungeonMat === 'boolean') {
      numberOfBools++;
    }
    if (typeof item.enemyMat === 'boolean') {
      numberOfBools++;
    }
    if (typeof item.localSpecialty === 'boolean') {
      numberOfBools++;
    }
    if (numberOfBools !== 5) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }

  next();
}

type newTaskBody = {
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
