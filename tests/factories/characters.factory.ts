import { prisma } from '../../source/config/index';
import faker from '@faker-js/faker';
import {
  CharacterAscensions,
  CharacterConstellations,
  Characters,
  CharacterTalents,
  UserAscensions,
  UserConstellations,
  UserTalents,
} from '@prisma/client';

export async function createCharacter() {
  const element = await createElement();

  const weapon = await createWeapon();

  const localSpecialty = await createLocalSpecialty();

  const region = await createRegion();

  const dungeon = await createDungeon(region.id);

  const dungeonMats = await createDungeonMats(dungeon.id);

  const bossMats = await createBossMats();

  const weeklyBossMats = await createWeeklyBossMats();

  const character = await prisma.characters.create({
    data: {
      name: faker.name.firstName(),
      elementId: element.id,
      weaponId: weapon.id,
      imageSplashArt: 'imageSplashArt',
      imageFace: 'imageFace',
      localSpecialtyId: localSpecialty.id,
      dungeonMatId: dungeonMats.id,
      bossMatId: bossMats.id,
      weeklyBossMatId: weeklyBossMats.id,
    },
  });

  return character;
}

export async function createUserCharacter(character: Characters, userId: number) {
  //THIS USER CHARACTER HAS:
  //  LEVEL: 90 (MAX)
  //  ASCENSIONS: ALL (MAX)
  //  CONSTELLATIONS: ONE (MIN = 0 , MAX = 6)
  //  TALENTS: LVL 1 ON ALL (MIN VALUE)
  //  FRIENDTHIP: 10  (MAX)

  //  NOTE: not the 'Traveler' (2 ascensions) or 'Kokomi' case (4 ascensions)

  //CREATE USER CHARATER:
  const userCharacter = await prisma.userCharacters.create({
    data: {
      userId: userId,
      characterId: character.id,
      level: 90,
      friendship: 10,
    },
  });

  //USER CHARACTER ALSO MUST HAVE:
  //  TALENTS
  //  ASCENSIONS
  //  CONSTELLATIONS

  //  CHARACTER TALENTS:
  //    NORMAL:
  const charTalentNormal = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    SKILL:
  const charTalentSkill = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    BURST:
  const charTalentBurst = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  const characterTalents: CharacterTalents[] = [charTalentNormal, charTalentSkill, charTalentBurst];
  const userTalents: UserTalents[] = [];

  //  CREATING USER TALENTS:
  for (let i = 0; i < characterTalents.length; i++) {
    userTalents.push(
      await prisma.userTalents.create({
        data: {
          userId: userCharacter.userId,
          userCharacterId: userCharacter.id,
          characterId: userCharacter.characterId,
          talentId: characterTalents[i].id,
          value: 1,
        },
      })
    );
  }

  //  CHARACTER ASCENSIONS:
  //    ASCENSION A0:
  const charAscension0 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    ASCENSION A1:
  const charAscension1 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    ASCENSION A4:
  const charAscension4 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  const characterAscensions: CharacterAscensions[] = [charAscension0, charAscension1, charAscension4];
  const userAscensions: UserAscensions[] = [];

  //  CREATING USER ASCENSIONS:
  //      notes:  Since level>60 -> user has all ascensions -> value = 3
  for (let i = 0; i < characterAscensions.length; i++) {
    userAscensions.push(
      await prisma.userAscensions.create({
        data: {
          userId: userCharacter.userId,
          userCharacterId: userCharacter.id,
          value: 3,
        },
      })
    );
  }

  //  CHARACTER CONSTELLATIONS:
  const characterConstellations: CharacterConstellations[] = [];

  for (let i = 0; i < 5; i++) {
    characterConstellations.push(
      await prisma.characterConstellations.create({
        data: {
          characterId: character.id,
          number: i + 1,
          title: faker.internet.userName(),
          text: faker.internet.userName(),
          image: faker.internet.userName(),
        },
      })
    );
  }

  //  USER CONSTELLATIONS:
  const userConstellations: UserConstellations[] = [
    await prisma.userConstellations.create({
      data: {
        userId: userCharacter.userId,
        userCharacterId: userCharacter.id,
        value: 1, //number of constellations user has
      },
    }),
  ];

  return {
    ...userCharacter,
    talents: userTalents,
    ascensions: userAscensions,
    constellations: userConstellations,
  };
}

export async function createCharacterWithDetails() {
  const character = await createCharacter();

  //  CHARACTER TALENTS:
  //    NORMAL:
  const charTalentNormal = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    SKILL:
  const charTalentSkill = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    BURST:
  const charTalentBurst = await prisma.characterTalents.create({
    data: {
      characterId: character.id,
      number: 1,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //  CHARACTER ASCENSIONS:
  //    ASCENSION A0:
  const charAscension0 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    ASCENSION A1:
  const charAscension1 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //    ASCENSION A4:
  const charAscension4 = await prisma.characterAscensions.create({
    data: {
      characterId: character.id,
      title: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });

  //  CHARACTER CONSTELLATIONS:
  const characterConstellations: CharacterConstellations[] = [];

  for (let i = 0; i < 5; i++) {
    characterConstellations.push(
      await prisma.characterConstellations.create({
        data: {
          characterId: character.id,
          number: i + 1,
          title: faker.internet.userName(),
          text: faker.internet.userName(),
          image: faker.internet.userName(),
        },
      })
    );
  }

  return {
    ...character,
    talents: {
      normal: charTalentNormal,
      skill: charTalentSkill,
      burst: charTalentBurst,
    },
    ascension: {
      a0: charAscension0,
      a1: charAscension1,
      a4: charAscension4,
    },
    constellations: characterConstellations,
  };
}

export async function createElement() {
  return await prisma.elements.create({
    data: {
      name: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });
}

export async function createWeapon() {
  return await prisma.weapons.create({
    data: {
      name: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });
}

export async function createLocalSpecialty() {
  return await prisma.localSpecialty.create({
    data: {
      name: faker.internet.userName(),
      key: faker.internet.userName(),
      image: faker.internet.userName(),
    },
  });
}

export async function createRegion() {
  return await prisma.region.create({
    data: {
      name: faker.internet.userName(),
    },
  });
}

export async function createDungeon(regionId: number) {
  return await prisma.dungeons.create({
    data: {
      name: faker.internet.userName(),
      text: faker.internet.userName(),
      image: faker.internet.userName(),
      regionId: regionId,
    },
  });
}

export async function createDungeonMats(dungeonId: number) {
  return await prisma.dungeonMats.create({
    data: {
      name: faker.internet.userName(),
      class: faker.internet.userName(),
      rarity: 2,
      key: faker.internet.userName(),
      image: faker.internet.userName(),
      day: faker.internet.userName(),
      dungeonId: dungeonId,
      weaponMat: false,
      characterMat: true,
    },
  });
}

export async function createBossMats() {
  return await prisma.bossMats.create({
    data: {
      name: faker.internet.userName(),
      image: faker.internet.userName(),
      key: faker.internet.userName(),
    },
  });
}

export async function createWeeklyBossMats() {
  return await prisma.weeklyBossMats.create({
    data: {
      name: faker.internet.userName(),
      image: faker.internet.userName(),
      key: faker.internet.userName(),
    },
  });
}
