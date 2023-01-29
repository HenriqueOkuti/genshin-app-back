//import { Login, LoginGithub, LoginGoogle, SignUp } from '@/controllers/authenticationController';
import { getUserInfo } from '@/controllers';
import {
  deleteUserCharacter,
  getAllCharacters,
  getUserCharacters,
  postUserCharacters,
  updateUserCharacter,
} from '@/controllers/charactersController';
import { validateBody, validateBodyValues, validateToken } from '@/middlewares';
import { createCharacterSchema, deleteCharacterSchema, updateCharacterSchema } from '@/schemas';
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
  .put(
    '/user',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateBody(updateCharacterSchema, req, res, next),
    (req, res, next) => validateBodyValues(req, res, next),
    updateUserCharacter
  )
  .delete(
    '/user',
    (req, res, next) => validateToken(req, res, next),
    (req, res, next) => validateBody(deleteCharacterSchema, req, res, next),
    deleteUserCharacter
  )
  .get('/all', (req, res, next) => validateToken(req, res, next), getAllCharacters);

//console.log()
// get /all controller is wrong (it's not supposed to be getUserCharacters)

export { charactersRouter };
