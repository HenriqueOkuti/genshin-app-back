import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers';
import { validateBody } from '@/middlewares/authenticationMiddleware';
import { loginSchema, signUpSchema } from '@/schemas/authenticationSchemas';
import { Router } from 'express';

const authenticationRouter = Router();

authenticationRouter
  .post('/signup', (req, res, next) => validateBody(signUpSchema, req, res, next), SignUp)
  .post('/login', (req, res, next) => validateBody(loginSchema, req, res, next), Login)
  .get('/login', (req, res) => {
    return res.sendStatus(200);
  })
  .post('/github', LoginGithub)
  .post('/google', LoginGoogle);

export { authenticationRouter };
