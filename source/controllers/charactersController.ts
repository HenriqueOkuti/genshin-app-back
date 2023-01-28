import { charactersService, postRequest } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUserCharacters(req: Request, res: Response) {
  const { userId } = res.locals;
  try {
    let message = null;
    //  find user characters
    const listCharacters = await charactersService.handleFetchCharacters(+userId);
    if (listCharacters.length === 0) {
      message = 'empty list';
    }

    return res.status(httpStatus.OK).send({ message: message, characters: listCharacters });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postUserCharacters(req: Request, res: Response) {
  const { userId } = res.locals;
  const newCharacter = req.body as postRequest;

  try {
    const createdCharacter = await charactersService.handleCreateCharacters(+userId, newCharacter);
    console.log(createdCharacter);
    return res.status(httpStatus.CREATED).send(createdCharacter);
  } catch (error) {
    if (error.name === 'CharacterNotFound') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'CharacterConflict') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
