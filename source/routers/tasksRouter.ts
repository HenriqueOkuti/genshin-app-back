import { deleteUserTasks, getUserTasks, postUserTasks, putUserTasks } from '@/controllers';
import { validateTaskValues, validateToken } from '@/middlewares';
import { Router } from 'express';

const tasksRouter = Router();

tasksRouter
  .get('/user', (req, res, next) => validateToken(req, res, next), getUserTasks)
  .post(
    '/user',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateTaskValues(req, res, next),
    postUserTasks
  )
  .put(
    '/user',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateTaskValues(req, res, next),
    putUserTasks
  )
  .delete('/user', (req, res, next) => validateToken(req, res, next), deleteUserTasks);

export { tasksRouter };
