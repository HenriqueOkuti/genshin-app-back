//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { getUserInfo } from '@/controllers';
import { getUserCharacters } from '@/controllers/charactersController';
import { validateToken } from '@/middlewares';
import { Router } from 'express';

const charactersRouter = Router();

charactersRouter
  .get('/', (req, res, next) => validateToken(req, res, next), getUserCharacters)
  .post('/', (req, res, next) => validateToken(req, res, next), getUserInfo)
  .put('/', (req, res, next) => validateToken(req, res, next), getUserInfo)
  .delete('/', (req, res, next) => validateToken(req, res, next), getUserInfo);

export { charactersRouter };
