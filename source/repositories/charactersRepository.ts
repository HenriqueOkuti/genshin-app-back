import { prisma } from '@/config';
import { postRequest, updateRequest } from '@/services';
import { Characters, UserAscensions, UserCharacters, UserConstellations, UserTalents } from '@prisma/client';

async function userCharacters(userId: number) {
  return await prisma.userCharacters.findMany({
    where: {
      userId: userId,
    },
  });
}

async function fillUserCharacterDetails(userId: number, character: UserCharacters) {
  await prisma.characters.findFirst({
    where: {
      id: character.characterId,
    },
  });

  const userTalents = await prisma.userTalents.findMany({
    where: {
      userCharacterId: character.id,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const userAscensions = await prisma.userAscensions.findMany({
    where: {
      userCharacterId: character.id,
    },
  });

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
      AND: [{ userId: userId }, { characterId: characterId }],
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

    if (ascensions.length === 2) {
      numberAscensions = 0;
      if (userCharacter.level >= 20) {
        numberAscensions++;
      }
      if (userCharacter.level >= 60) {
        numberAscensions++;
      }
    } else if (ascensions.length === 4) {
      numberAscensions = 2;
      if (userCharacter.level >= 20) {
        numberAscensions++;
      }
      if (userCharacter.level >= 60) {
        numberAscensions++;
      }
    } else {
      numberAscensions = 1;
      if (userCharacter.level >= 20) {
        numberAscensions++;
      }
      if (userCharacter.level >= 60) {
        numberAscensions++;
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

  const charTalents = await prisma.characterTalents.findMany({
    where: {
      characterId: userCharacter.characterId,
    },
  });

  const auxDict = {
    normal: 0,
    skill: 0,
    burst: 0,
  };

  const auxDict2 = {
    normal: 0,
    skill: 0,
    burst: 0,
  };

  const auxDict3 = {
    normal: 0,
    skill: 0,
    burst: 0,
  };

  for (const [key, value] of Object.entries(charTalents)) {
    if (value.number === 1) {
      auxDict.normal = value.id;
    }
    if (value.number === 2) {
      auxDict.skill = value.id;
    }
    if (value.number === 3) {
      auxDict.burst = value.id;
    }
  }

  for (const [key, value] of Object.entries(oldTalents)) {
    if (value.talentId === auxDict.normal) {
      auxDict2.normal = value.id;
    }
    if (value.talentId === auxDict.skill) {
      auxDict2.skill = value.id;
    }
    if (value.talentId === auxDict.burst) {
      auxDict2.burst = value.id;
    }
  }

  for (let i = 0; i < oldTalents.length; i++) {
    if (oldTalents[i].talentId === auxDict.normal) {
      auxDict3.normal = i;
    }
    if (oldTalents[i].talentId === auxDict.skill) {
      auxDict3.skill = i;
    }
    if (oldTalents[i].talentId === auxDict.burst) {
      auxDict3.burst = i;
    }
  }

  if (oldTalents[auxDict3.normal].value !== userCharacter.talents.normal) {
    await prisma.userTalents.update({
      where: {
        id: auxDict2.normal,
      },
      data: {
        value: userCharacter.talents.normal,
      },
    });
  }
  if (oldTalents[auxDict3.skill].value !== userCharacter.talents.skill) {
    await prisma.userTalents.update({
      where: {
        id: auxDict2.skill,
      },
      data: {
        value: userCharacter.talents.skill,
      },
    });
  }
  if (oldTalents[auxDict3.burst].value !== userCharacter.talents.burst) {
    await prisma.userTalents.update({
      where: {
        id: auxDict2.burst,
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

  if (ascensions.length === 2) {
    numberAscensions = 0;
    if (newCharacter.level >= 20) {
      numberAscensions++;
    }
    if (newCharacter.level >= 60) {
      numberAscensions++;
    }
  } else if (ascensions.length === 4) {
    numberAscensions = 2;
    if (newCharacter.level >= 20) {
      numberAscensions++;
    }
    if (newCharacter.level >= 60) {
      numberAscensions++;
    }
  } else {
    numberAscensions = 1;
    if (newCharacter.level >= 20) {
      numberAscensions++;
    }
    if (newCharacter.level >= 60) {
      numberAscensions++;
    }
  }

  await prisma.userAscensions.create({
    data: {
      userId: userId,
      userCharacterId: createdUserCharacter.id,
      value: numberAscensions,
    },
  });

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

async function findWeapons() {
  return await prisma.weapons.findMany({});
}

async function findElements() {
  return await prisma.elements.findMany({});
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
  findWeapons,
  findElements,
};

export { charactersRepository };
