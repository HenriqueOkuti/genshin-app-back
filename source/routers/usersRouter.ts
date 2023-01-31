//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { getUserInfo, putUserInfo } from '@/controllers';
import { validateBody, validateToken } from '@/middlewares';
import { updateUserSchema } from '@/schemas';
import { Router } from 'express';

const usersRouter = Router();

usersRouter
  .get('/info', (req, res, next) => validateToken(req, res, next), getUserInfo)
  .put(
    '/info',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateBody(updateUserSchema, req, res, next),
    putUserInfo
  );

export { usersRouter };
