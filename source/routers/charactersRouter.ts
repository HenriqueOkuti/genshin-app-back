//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { getUserInfo } from '@/controllers';
import { getUserCharacters, postUserCharacters } from '@/controllers/charactersController';
import { validateBody, validateBodyValues, validateToken } from '@/middlewares';
import { createCharacterSchema } from '@/schemas';
import { Router } from 'express';

const charactersRouter = Router();

charactersRouter
  .get('/user', (req, res, next) => validateToken(req, res, next), getUserCharacters)
  .post(
    '/user',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateBody(createCharacterSchema, req, res, next),
    (req, res, next) => validateBodyValues(req, res, next),
    postUserCharacters
  )
  .put('/user', (req, res, next) => validateToken(req, res, next), getUserInfo)
  .delete('/user', (req, res, next) => validateToken(req, res, next), getUserInfo);

export { charactersRouter };
