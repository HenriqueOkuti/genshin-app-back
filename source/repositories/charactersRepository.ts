import { prisma } from '@/config';
import { CharacterAscensions, UserAscensions, UserCharacters, UserConstellations, UserTalents } from '@prisma/client';

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

const charactersRepository = { userCharacters, fillUserCharacterDetails };

export { charactersRepository };
