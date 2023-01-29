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

export type updateRequest = {
  userCharacterId: number;
  characterId: number;
  level: number;
  friendship: number;
  constellations: number;
  talents: { normal: number; skill: number; burst: number };
};

async function handleUpdateCharacters(userId: number, userCharacter: updateRequest) {
  const currentUserCharacter = await charactersRepository.findUserCharacterViaID(userCharacter.userCharacterId, userId);

  if (!currentUserCharacter) {
    throw charactersErrors.notFoundError();
  }

  const character = await charactersRepository.findCharacter(userCharacter.characterId);
  if (!character) {
    throw charactersErrors.notFoundError();
  }

  //update values
  const updatedChar = await charactersRepository.updateUserCharacter(userId, userCharacter, currentUserCharacter);
  return updatedChar;
}

async function handleDeleteCharacters(userId: number, userCharacterId: number) {
  //find userCharacter
  //console.log('service');
  const userCharacter = await charactersRepository.findUserCharacterViaID(userCharacterId, userId);
  //console.log(userCharacter);
  if (!userCharacter) {
    throw charactersErrors.notFoundError();
  }

  await charactersRepository.deleteUserCharacter(userId, userCharacter);
  return true;
}

const charactersService = {
  handleFetchCharacters,
  handleCreateCharacters,
  handleUpdateCharacters,
  handleDeleteCharacters,
};

export { charactersService };
