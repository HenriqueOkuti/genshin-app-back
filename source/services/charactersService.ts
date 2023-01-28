import { charactersErrors, usersErrors } from '@/errors';
import { charactersRepository, FixedCharacterType } from '@/repositories';

async function handleFetchCharacters(userId: number) {
  //search and return
  const characters = await charactersRepository.userCharacters(userId);

  const fixedCharacters: FixedCharacterType[] = [];

  for (let i = 0; i < characters.length; i++) {
    const fixedCharacter = await charactersRepository.fillUserCharacterDetails(userId, characters[i]);
    fixedCharacters.push(fixedCharacter);
  }

  return fixedCharacters;
}

export type postRequest = {
  characterid: number;
  level: number;
  friendship: number;
  constellations: number;
  talents: { normal: number; skill: number; burst: number };
};

async function handleCreateCharacters(userId: number, newCharacter: postRequest) {
  //console.log(userId, newCharacter);
  const characterExists = await charactersRepository.findCharacter(newCharacter.characterid);
  if (!characterExists) {
    throw charactersErrors.characterNotFoundError();
  }

  const userCharacter = await charactersRepository.findUserCharacter(newCharacter.characterid, userId);
  if (userCharacter) {
    throw charactersErrors.characterAlreadyCreatedError();
  }

  //handle create character
  const createdCharacter = await charactersRepository.createUserCharacter(userId, newCharacter, characterExists);

  return createdCharacter;
}

const charactersService = {
  handleFetchCharacters,
  handleCreateCharacters,
};

export { charactersService };
