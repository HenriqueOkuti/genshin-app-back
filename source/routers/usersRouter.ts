//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { getUserInfo } from '@/controllers';
import { validateToken } from '@/middlewares';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/info', (req, res, next) => validateToken(req, res, next), getUserInfo);

export { usersRouter };
