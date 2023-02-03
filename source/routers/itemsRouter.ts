import {
  deleteUserTasks,
  getAllItems,
  getBossMats,
  getDungeonMats,
  getEnemyMats,
  getLocalSpecialty,
  getUserTasks,
  getWeeklyBossMats,
  postUserTasks,
  putUserTasks,
} from '@/controllers';
import { validateToken } from '@/middlewares';
import { Router } from 'express';

const itemsRouter = Router();

itemsRouter
  .get('/weeklybossmat', (req, res, next) => validateToken(req, res, next), getWeeklyBossMats)
  .get('/bossmat', (req, res, next) => validateToken(req, res, next), getBossMats)
  .get('/dungeonmat', (req, res, next) => validateToken(req, res, next), getDungeonMats)
  .get('/enemymat', (req, res, next) => validateToken(req, res, next), getEnemyMats)
  .get('/localspecialty', (req, res, next) => validateToken(req, res, next), getLocalSpecialty)
  .get('/all', (req, res, next) => validateToken(req, res, next), getAllItems);

export { itemsRouter };
