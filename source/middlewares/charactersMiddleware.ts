import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function validateBodyValues(req: Request, res: Response, next: NextFunction) {
  const { level, friendship, constellations, talents } = req.body as {
    level: number;
    friendship: number;
    constellations: number;
    talents: { normal: number; skill: number; burst: number };
  };

  if (level < 1 || level > 90) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  if (friendship < 1 || friendship > 10) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  if (constellations < 0 || constellations > 6) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  let maxSkillLvl = 10;
  let maxBurstLvl = 10;

  if (constellations >= 3) {
    maxSkillLvl = 13;
  }
  if (constellations >= 5) {
    maxBurstLvl = 13;
  }

  if (talents.normal < 1 || talents.normal > 10) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  if (talents.skill < 1 || talents.skill > maxSkillLvl) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  if (talents.burst < 1 || talents.burst > maxBurstLvl) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  next();
}
