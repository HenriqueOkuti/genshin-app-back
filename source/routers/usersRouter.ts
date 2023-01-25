//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { validateToken } from '@/middlewares';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get(
  '/info',
  (req, res, next) => validateToken(req, res, next),
  (req, res) => res.sendStatus(200),
);

export { usersRouter };
