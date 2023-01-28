import { charactersService } from '@/services';
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
