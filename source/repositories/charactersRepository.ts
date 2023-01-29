import { prisma } from '@/config';
import { postRequest, updateRequest } from '@/services';
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

async function findUserCharacterViaID(id: number, userId: number) {
  return await prisma.userCharacters.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  });
}

async function updateUserCharacter(userId: number, userCharacter: updateRequest, oldUserCharacter: UserCharacters) {
  if (userCharacter.level !== oldUserCharacter.level) {
    const ascensions = await prisma.characterAscensions.findMany({
      where: {
        characterId: userCharacter.characterId,
      },
    });
    let numberAscensions = 0;
    //create user character ascensions
    if (ascensions.length === 2) {
      //traveler case
      numberAscensions = 0;
      if (userCharacter.level >= 20) {
        numberAscensions++; // 0 + 1
      }
      if (userCharacter.level >= 60) {
        numberAscensions++; // 1 + 1
      }
    } else if (ascensions.length === 4) {
      //kokomi case
      numberAscensions = 2;
      if (userCharacter.level >= 20) {
        numberAscensions++; // 2 + 1
      }
      if (userCharacter.level >= 60) {
        numberAscensions++; // 3 + 1
      }
    } else {
      numberAscensions = 1;
      if (userCharacter.level >= 20) {
        numberAscensions++; // 1 + 1
      }
      if (userCharacter.level >= 60) {
        numberAscensions++; // 2 + 1
      }
    }

    const userAscensionId = await prisma.userAscensions.findFirst({
      where: {
        userId: userId,
        userCharacterId: userCharacter.userCharacterId,
      },
    });

    await prisma.userAscensions.update({
      where: {
        id: userAscensionId.id,
      },
      data: {
        value: numberAscensions,
      },
    });
  }

  const oldConstellations = await prisma.userConstellations.findFirst({
    where: {
      userCharacterId: userCharacter.userCharacterId,
    },
  });

  if (userCharacter.constellations !== oldConstellations.value) {
    const cons = await prisma.userConstellations.findFirst({
      where: {
        userId: userId,
        userCharacterId: userCharacter.userCharacterId,
      },
    });

    await prisma.userConstellations.update({
      where: {
        id: cons.id,
      },
      data: {
        value: userCharacter.constellations,
      },
    });
  }

  const oldTalents = await prisma.userTalents.findMany({
    where: {
      userCharacterId: userCharacter.userCharacterId,
    },
  });

  if (oldTalents[0].value !== userCharacter.talents.normal) {
    await prisma.userTalents.update({
      where: {
        id: oldTalents[0].id,
      },
      data: {
        value: userCharacter.talents.normal,
      },
    });
  }
  if (oldTalents[1].value !== userCharacter.talents.skill) {
    await prisma.userTalents.update({
      where: {
        id: oldTalents[1].id,
      },
      data: {
        value: userCharacter.talents.skill,
      },
    });
  }
  if (oldTalents[2].value !== userCharacter.talents.burst) {
    await prisma.userTalents.update({
      where: {
        id: oldTalents[2].id,
      },
      data: {
        value: userCharacter.talents.burst,
      },
    });
  }

  const updatedChar = await prisma.userCharacters.update({
    where: {
      id: userCharacter.userCharacterId,
    },
    data: {
      level: userCharacter.level,
      friendship: userCharacter.friendship,
    },
  });

  return updatedChar;
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

async function deleteUserCharacter(userId: number, userCharacter: UserCharacters) {
  await prisma.userTalents.deleteMany({
    where: {
      userCharacterId: userCharacter.id,
      userId: userId,
    },
  });

  await prisma.userConstellations.deleteMany({
    where: {
      userCharacterId: userCharacter.id,
      userId: userId,
    },
  });

  await prisma.userAscensions.deleteMany({
    where: {
      userCharacterId: userCharacter.id,
      userId: userId,
    },
  });

  await prisma.userCharacters.delete({
    where: {
      id: userCharacter.id,
    },
  });

  return true;
}

async function findAllCharacters() {
  return await prisma.characters.findMany({});
}

async function findCharacterAscensions(characterId: number) {
  return await prisma.characterAscensions.findMany({
    where: {
      characterId: characterId,
    },
  });
}

async function findCharacterConstellations(characterId: number) {
  return await prisma.characterConstellations.findMany({
    where: { characterId: characterId },
  });
}

async function findCharacterTalents(characterId: number) {
  return await prisma.characterTalents.findMany({
    where: {
      characterId: characterId,
    },
  });
}

const charactersRepository = {
  userCharacters,
  fillUserCharacterDetails,
  findCharacter,
  findUserCharacter,
  createUserCharacter,
  findUserCharacterViaID,
  updateUserCharacter,
  deleteUserCharacter,
  findAllCharacters,
  findCharacterTalents,
  findCharacterAscensions,
  findCharacterConstellations,
};

export { charactersRepository };
