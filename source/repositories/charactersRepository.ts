import { prisma } from '@/config';
import { postRequest } from '@/services';
import {
  CharacterAscensions,
  Characters,
  UserAscensions,
  UserCharacters,
  UserConstellations,
  UserTalents,
} from '@prisma/client';

async function userCharacters(userId: number) {
  return await prisma.userCharacters.findMany({
    where: {
      userId: userId,
    },
  });
}

async function fillUserCharacterDetails(userId: number, character: UserCharacters) {
  const characterDetails = await prisma.characters.findFirst({
    where: {
      id: character.characterId,
    },
  });
  //console.log(characterDetails);

  //Annex correct Talents for 'character':
  const userTalents = await prisma.userTalents.findMany({
    where: {
      userCharacterId: character.id,
    },
  });

  //Annex correct ascensions for 'character':
  const userAscensions = await prisma.userAscensions.findMany({
    where: {
      userCharacterId: character.id,
    },
  });

  //    console.log();
  //    this makes userAscensions table useless
  //   const characterAscensions = await prisma.characterAscensions.findMany({
  //     where: {
  //       characterId: character.characterId,
  //     },
  //   });
  //   const userAscensions: CharacterAscensions[] = [];
  //   const characterFirstName = characterDetails.name.split(' ')[0];
  //   if (characterFirstName === 'Traveler') {
  //     if (character.level >= 20) {
  //       userAscensions.push(characterAscensions[0]);
  //     }
  //     if (character.level >= 60) {
  //       userAscensions.push(characterAscensions[1]);
  //     }
  //   } else if (characterFirstName === 'Sangonomiya') {
  //     userAscensions.push(characterAscensions[0]);
  //     if (character.level >= 20) {
  //       userAscensions.push(characterAscensions[1]);
  //     }
  //     if (character.level >= 60) {
  //       userAscensions.push(characterAscensions[2]);
  //     }
  //     userAscensions.push(characterAscensions[3]);
  //   } else {
  //     userAscensions.push(characterAscensions[0]);
  //     if (character.level >= 20) {
  //       userAscensions.push(characterAscensions[1]);
  //     }
  //     if (character.level >= 60) {
  //       userAscensions.push(characterAscensions[2]);
  //     }
  //   }

  //Annex correct constellations for 'character':

  //Annex correct constellations for 'character':

  const userConstellations = await prisma.userConstellations.findMany({
    where: {
      userCharacterId: character.id,
    },
  });

  const fixedCharacter = {
    ...character,
    talents: userTalents,
    ascensions: userAscensions,
    constellations: userConstellations,
  };

  return fixedCharacter;
}

export type FixedCharacterType = {
  talents: UserTalents[];
  ascensions: UserAscensions[];
  constellations: UserConstellations[];
  id: number;
  userId: number;
  characterId: number;
  level: number;
  friendship: number;
};

async function findCharacter(characterId: number) {
  return await prisma.characters.findFirst({
    where: {
      id: characterId,
    },
  });
}

async function findUserCharacter(characterId: number, userId: number) {
  return await prisma.userCharacters.findFirst({
    where: {
      userId: userId,
      characterId: characterId,
    },
  });
}

async function createUserCharacter(userId: number, newCharacter: postRequest, character: Characters) {
  //

  const talents = await prisma.characterTalents.findMany({
    where: {
      characterId: character.id,
    },
  });

  const ascensions = await prisma.characterAscensions.findMany({
    where: {
      characterId: character.id,
    },
  });

  const constellations = await prisma.characterConstellations.findMany({
    where: {
      characterId: character.id,
    },
  });

  const createdUserCharacter = await prisma.userCharacters.create({
    data: {
      userId: userId,
      characterId: character.id,
      level: newCharacter.level,
      friendship: newCharacter.friendship,
    },
  });

  //create user character talents
  const userCharacterValues = [newCharacter.talents.normal, newCharacter.talents.skill, newCharacter.talents.burst];
  for (let i = 0; i < talents.length; i++) {
    await prisma.userTalents.create({
      data: {
        userId: createdUserCharacter.userId,
        userCharacterId: createdUserCharacter.id,
        characterId: createdUserCharacter.characterId,
        talentId: talents[i].id,
        value: userCharacterValues[i],
      },
    });
  }

  let numberAscensions = 0;
  //create user character ascensions
  if (ascensions.length === 2) {
    //traveler case
    numberAscensions = 0;
    if (newCharacter.level >= 20) {
      numberAscensions++; // 0 + 1
    }
    if (newCharacter.level >= 60) {
      numberAscensions++; // 1 + 1
    }
  } else if (ascensions.length === 4) {
    //kokomi case
    numberAscensions = 2;
    if (newCharacter.level >= 20) {
      numberAscensions++; // 2 + 1
    }
    if (newCharacter.level >= 60) {
      numberAscensions++; // 3 + 1
    }
  } else {
    numberAscensions = 1;
    if (newCharacter.level >= 20) {
      numberAscensions++; // 1 + 1
    }
    if (newCharacter.level >= 60) {
      numberAscensions++; // 2 + 1
    }
  }

  await prisma.userAscensions.create({
    data: {
      userId: userId,
      userCharacterId: createdUserCharacter.id,
      value: numberAscensions,
    },
  });

  //create user character constellations

  await prisma.userConstellations.create({
    data: {
      userId: userId,
      userCharacterId: createdUserCharacter.id,
      value: newCharacter.constellations,
    },
  });

  return createdUserCharacter;
}

const charactersRepository = {
  userCharacters,
  fillUserCharacterDetails,
  findCharacter,
  findUserCharacter,
  createUserCharacter,
};

export { charactersRepository };
