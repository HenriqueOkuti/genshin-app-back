import { charactersErrors, usersErrors } from '@/errors';
import { charactersRepository, FixedCharacterType } from '@/repositories';
import { CharacterAscensions, CharacterConstellations, CharacterTalents } from '@prisma/client';

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
  characterId: number;
  level: number;
  friendship: number;
  constellations: number;
  talents: { normal: number; skill: number; burst: number };
};

async function handleCreateCharacters(userId: number, newCharacter: postRequest) {
  //console.log(userId, newCharacter);
  const characterExists = await charactersRepository.findCharacter(newCharacter.characterId);
  if (!characterExists) {
    throw charactersErrors.characterNotFoundError();
  }

  const userCharacter = await charactersRepository.findUserCharacter(newCharacter.characterId, userId);

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

async function handleFetchAll() {
  const allCharacters = await charactersRepository.findAllCharacters();

  interface FixedAscInter {
    [key: string]: any;
  }

  type fixedCharacterType = {
    id: number;
    name: string;
    elementId: number;
    weaponId: number;
    localSpecialtyId: number;
    dungeonMatId: number;
    bossMatId: number;
    weeklyBossMatId: number;
    talents: {
      normal: CharacterTalents;
      skill: CharacterTalents;
      burst: CharacterTalents;
    };
    ascension: FixedAscInter;
    constellations: CharacterConstellations[];
  };

  const fixedCharacters: fixedCharacterType[] = [];

  for (let i = 0; i < allCharacters.length; i++) {
    const characterTalents = await charactersRepository.findCharacterTalents(allCharacters[i].id);
    const characterAscensions = await charactersRepository.findCharacterAscensions(allCharacters[i].id);
    const characterConstellations = await charactersRepository.findCharacterConstellations(allCharacters[i].id);

    const fixedAscensions: FixedAscInter = {};
    if (characterAscensions.length === 3) {
      fixedAscensions.a0 = characterAscensions[0];
      fixedAscensions.a1 = characterAscensions[1];
      fixedAscensions.a4 = characterAscensions[2];
    }
    if (characterAscensions.length === 4) {
      fixedAscensions.a0 = characterAscensions[0];
      fixedAscensions.a1 = characterAscensions[1];
      fixedAscensions.a4 = characterAscensions[2];
      fixedAscensions.aBonus = characterAscensions[3];
    }
    if (characterAscensions.length === 2) {
      fixedAscensions.a1 = characterAscensions[0];
      fixedAscensions.a4 = characterAscensions[1];
    }

    const characterFixed = {
      id: allCharacters[i].id,
      name: allCharacters[i].name,
      elementId: allCharacters[i].elementId,
      weaponId: allCharacters[i].weaponId,
      localSpecialtyId: allCharacters[i].localSpecialtyId,
      dungeonMatId: allCharacters[i].dungeonMatId,
      bossMatId: allCharacters[i].bossMatId,
      weeklyBossMatId: allCharacters[i].weeklyBossMatId,
      talents: {
        normal: characterTalents[0],
        skill: characterTalents[1],
        burst: characterTalents[2],
      },
      ascension: fixedAscensions,
      constellations: characterConstellations,
    };

    fixedCharacters.push(characterFixed);
  }

  return fixedCharacters;
}

async function handleFetchWeapons() {
  return await charactersRepository.findWeapons();
}

async function handleFetchElements() {
  return await charactersRepository.findElements();
}

const charactersService = {
  handleFetchCharacters,
  handleCreateCharacters,
  handleUpdateCharacters,
  handleDeleteCharacters,
  handleFetchAll,
  handleFetchWeapons,
  handleFetchElements,
};

export { charactersService };
