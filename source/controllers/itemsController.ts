import { itemsService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getWeeklyBossMats(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchWeeklyBossMats();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getBossMats(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchBossMats();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getDungeonMats(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchDungeonMats();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getEnemyMats(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchEnemyMats();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getLocalSpecialty(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchLocalSpecialty();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAllItems(req: Request, res: Response) {
  try {
    const mats = await itemsService.fetchAll();

    return res.status(httpStatus.OK).send(mats);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
