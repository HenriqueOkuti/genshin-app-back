import { PrismaClient } from '@prisma/client';
import allDungeons from './seedData/allDungeons.json';
import allCharacters from './seedData/charactersInfo.json';
import allRegions from './seedData/regions.json';
import allItems from './seedData/itemsNameId.json';
import { Console } from 'console';

const prisma = new PrismaClient();

async function cleanDb() {
  await prisma.characterEnemyMats.deleteMany({});
  await prisma.characterAscensions.deleteMany({});
  await prisma.characterConstellations.deleteMany({});
  await prisma.characterTalents.deleteMany({});
  await prisma.characters.deleteMany({});

  await prisma.session.deleteMany({});
  await prisma.taskInfo.deleteMany({});
  await prisma.tasks.deleteMany({});
  await prisma.userTasks.deleteMany({});
  await prisma.backpackInfo.deleteMany({});
  await prisma.userBackpack.deleteMany({});
  await prisma.gems.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.elements.deleteMany({});
  await prisma.userCharacters.deleteMany({});
  await prisma.bossMats.deleteMany({});

  await prisma.dungeonMats.deleteMany({});
  await prisma.dungeons.deleteMany({});

  await prisma.region.deleteMany({});
  await prisma.localSpecialty.deleteMany({});

  await prisma.weapons.deleteMany({});

  await prisma.enemyMats.deleteMany({});
  await prisma.themeHexes.deleteMany({});
  await prisma.themes.deleteMany({});
}

async function insertElements() {
  const elements = [
    {
      name: 'anemo',
      image: '/elements/anemo.png',
    },
    {
      name: 'cryo',
      image: '/elements/cryo.png',
    },
    {
      name: 'dendro',
      image: '/elements/dendro.png',
    },
    {
      name: 'electro',
      image: '/elements/electro.png',
    },
    {
      name: 'geo',
      image: '/elements/geo.png',
    },
    {
      name: 'hydro',
      image: '/elements/hydro.png',
    },
    {
      name: 'pyro',
      image: '/elements/pyro.png',
    },
    {
      name: 'Traveler',
      image: 'null',
    },
  ];

  return await prisma.elements.createMany({
    data: elements,
  });
}

async function insertRegions(regions: { name: string }[]) {
  return await prisma.region.createMany({
    data: regions,
  });
}

async function findRegionId(name: string) {
  return await prisma.region.findFirst({
    where: {
      name: name,
    },
  });
}

async function insertDungeons(dungeons: { name: string; image: string; regionId: number; text: string }[]) {
  await prisma.dungeons.createMany({
    data: dungeons,
  });
}

async function main() {
  await cleanDb();

  const dungeons = allDungeons;
  const characters = allCharacters;
  const items = allItems;
  const regions = allRegions;

  //console.log(dungeons);
  //console.log(characters);
  //console.log(items);
  //console.log(regions);

  //insert elements:
  await insertElements();

  //insert regions:
  const regionsArray: { name: string }[] = [];
  for (const [key, value] of Object.entries(regions)) {
    regionsArray.push({ name: value });
  }

  await insertRegions(regionsArray);

  const talentDungeonsFormatted: { name: string; image: string; regionId: number; text: string }[] = [];

  //insert dungeons -> dungeons.talentDungeons
  const talentDungeons = dungeons.talentDungeons;
  for (const [key, value] of Object.entries(talentDungeons)) {
    const regionId = await findRegionId(value.region);

    const dungeonData = {
      name: value.name,
      image: value.image,
      regionId: regionId?.id || 0,
      text: value.text,
    };

    talentDungeonsFormatted.push(dungeonData);
  }

  const weaponDungeonsFormatted: { name: string; image: string; regionId: number; text: string }[] = [];

  //insert dungeons -> dungeons.talentDungeons
  const weaponDungeons = dungeons.weaponDungeons;
  for (const [key, value] of Object.entries(weaponDungeons)) {
    const regionId = await findRegionId(value.region);

    const dungeonData = {
      name: value.name,
      image: value.image,
      regionId: regionId?.id || 0,
      text: value.text,
    };

    weaponDungeonsFormatted.push(dungeonData);
  }

  await insertDungeons(talentDungeonsFormatted);
  await insertDungeons(weaponDungeonsFormatted);

  //insert dungeonMats -> items.dungeonMats
  interface dungeonMatsGroupInterface {
    2: string;
    3: string;
    4: string;
  }

  const dungeonMatsGroup: dungeonMatsGroupInterface = {
    2: 'Teachings of ',
    3: 'Guide to ',
    4: 'Philosophies of ',
  };

  interface dungeonMatsRarityInterface {
    teachings: number;
    guide: number;
    philosophies: number;
  }

  const dungeonMatsRarity: dungeonMatsRarityInterface = {
    teachings: 2,
    guide: 3,
    philosophies: 4,
  };

  interface daysDictionaryInterface {
    Freedom: string;
    Resistance: string;
    Ballad: string;
    Prosperity: string;
    Diligence: string;
    Gold: string;
    Transience: string;
    Elegance: string;
    Light: string;
    Admonition: string;
    Ingenuity: string;
    Praxis: string;
  }

  const daysDictionary: daysDictionaryInterface = {
    Freedom: 'monday',
    Resistance: 'tuesday',
    Ballad: 'wednesday',
    Prosperity: 'monday',
    Diligence: 'tuesday',
    Gold: 'wednesday',
    Transience: 'monday',
    Elegance: 'tuesday',
    Light: 'wednesday',
    Admonition: 'monday',
    Ingenuity: 'tuesday',
    Praxis: 'wednesday',
  };

  const locationDictionary: daysDictionaryInterface = {
    Freedom: 'Forsaken Rift',
    Resistance: 'Forsaken Rift',
    Ballad: 'Forsaken Rift',
    Prosperity: 'Taishan Mansion',
    Diligence: 'Taishan Mansion',
    Gold: 'Taishan Mansion',
    Transience: 'Violet Court',
    Elegance: 'Violet Court',
    Light: 'Violet Court',
    Admonition: 'Steeple of Ignorance',
    Ingenuity: 'Steeple of Ignorance',
    Praxis: 'Steeple of Ignorance',
  };

  for (const [key, value] of Object.entries(items.dungeonMats)) {
    const rarityMat = dungeonMatsRarity[key.split('_')[0] as keyof dungeonMatsRarityInterface];
    const classMat = value;
    const fixName = dungeonMatsGroup[rarityMat as keyof dungeonMatsGroupInterface] + value;

    const day = daysDictionary[value as keyof daysDictionaryInterface];

    const dungeon = await prisma.dungeons.findFirst({
      where: {
        name: locationDictionary[value as keyof daysDictionaryInterface],
      },
    });

    const dungeonItem = {
      name: fixName,
      class: classMat,
      rarity: rarityMat,
      key: key,
      image: `/items/${key}.png`,
      day: day,
      dungeonId: dungeon?.id || 0,
      weaponMat: false,
      characterMat: true,
    };

    await prisma.dungeonMats.create({
      data: {
        name: fixName,
        class: classMat,
        rarity: rarityMat,
        key: key,
        image: `/items/${key}.png`,
        day: day,
        dungeonId: dungeon?.id || 0,
        weaponMat: false,
        characterMat: true,
      },
    });
  }

  //insert localSpecialty -> items.localSpecialty
  const localSpecialty = items.localSpecialty;

  for (const [key, value] of Object.entries(localSpecialty)) {
    await prisma.localSpecialty.create({
      data: {
        name: value,
        key: key,
        image: `/items/${key}.png`,
      },
    });
  }

  //insert enemyMats -> items.enemyMats
  const enemyMats = items.enemyMats;

  for (const [key, value] of Object.entries(enemyMats)) {
    await prisma.enemyMats.create({
      data: {
        name: value.name,
        image: `/items/${key}.png`,
        key: key,
        rarity: value.rarity,
      },
    });
  }

  //insert bossMats -> items.bossMats
  const bossMats = items.bossMats;

  for (const [key, value] of Object.entries(bossMats)) {
    await prisma.bossMats.create({
      data: {
        name: value,
        image: `/items/${key}.png`,
        key: key,
      },
    });
  }

  //insert weeklyBossMats -> items.weeklyBossMats
  //func here
  const weeklyBossMats = items.weeklyBossMats;

  for (const [key, value] of Object.entries(weeklyBossMats)) {
    await prisma.weeklyBossMats.create({
      data: {
        name: value,
        image: `/items/${key}.png`,
        key: key,
      },
    });
  }

  //insert weapons  -> polearm, bow, catalyst, claymore, sword
  //func here

  const weapons = {
    1: { name: 'Sword', image: '' },
    2: { name: 'Claymore', image: '' },
    3: { name: 'Bow', image: '' },
    4: { name: 'Catalyst', image: '' },
    5: { name: 'Polearm', image: '' },
  };

  for (const [key, value] of Object.entries(weapons)) {
    await prisma.weapons.create({
      data: {
        name: value.name,
        image: `/weaponDefaults/${value.name}.png`,
      },
    });
  }

  //insert gems -> items.gems
  const gems = items.gems;

  interface gemsRarityInterface {
    sliver: number;
    fragment: number;
    chunk: number;
    gemstone: number;
  }

  const gemsRarityObj: gemsRarityInterface = {
    sliver: 2,
    fragment: 3,
    chunk: 4,
    gemstone: 5,
  };

  for (const [key, value] of Object.entries(gems)) {
    const rarityKey = key.split('_')[2];
    const rarity = gemsRarityObj[rarityKey as keyof gemsRarityInterface];
    const element = await prisma.elements.findFirst({
      where: {
        name: value,
      },
    });

    await prisma.gems.create({
      data: {
        name: key,
        image: `/items/${key}.png`,
        rarity: rarity,
        elementId: element?.id || 0,
      },
    });
  }

  for (const [key, value] of Object.entries(allCharacters)) {
    const constellations = value.constellations;
    const ascensions = value.ascensions;
    const talents = value.talents;

    const weaponType = await prisma.weapons.findFirst({
      where: {
        name: value.weapon.name,
      },
    });

    const usedElem = Object.keys(value.gems)[0];

    let charElement: string = '';

    if (usedElem === 'Traveler') {
      charElement = key.split('_')[1];
    } else {
      charElement = usedElem;
    }

    const element = (await prisma.elements.findFirst({
      where: {
        name: charElement,
      },
    })) || { id: 0 }; //elementId = element.id

    const charLocalSpecialty = await prisma.localSpecialty.findFirst({
      where: {
        key: value.localSpecialty,
      },
    });

    const charDungeonMats = await prisma.dungeonMats.findFirst({
      where: {
        key: value.dungeonMat,
      },
    });

    const bossMat = await prisma.bossMats.findFirst({
      where: {
        key: value.bossMat,
      },
    });

    const weeklyBossMat = await prisma.weeklyBossMats.findFirst({
      where: {
        key: value.weeklyBossMat.id,
      },
    });

    //insert characters
    const characterCreated = await prisma.characters.create({
      data: {
        name: value.name,
        elementId: element.id,
        weaponId: weaponType?.id || 0,
        imageSplashArt: value.imageSplashArt,
        imageFace: value.imageFace,
        localSpecialtyId: charLocalSpecialty?.id || 0,
        dungeonMatId: charDungeonMats?.id || 0,
        bossMatId: bossMat?.id || 0,
        weeklyBossMatId: weeklyBossMat?.id || 0,
      },
    });

    //insert CharacterEnemyMats
    const charEnemyMats = value.enemyMat;

    for (let i = 0; i < charEnemyMats.length; i++) {
      const enemyMat = await prisma.enemyMats.findFirst({
        where: {
          key: charEnemyMats[i].id,
        },
      });

      await prisma.characterEnemyMats.create({
        data: {
          characterId: characterCreated.id,
          enemyMatId: enemyMat?.id || 0,
        },
      });
    }

    //insert characterTalents
    await prisma.characterTalents.create({
      data: {
        characterId: characterCreated.id,
        number: 1,
        title: talents.normal.title,
        text: talents.normal.text,
        image: talents.normal.image,
      },
    });

    await prisma.characterTalents.create({
      data: {
        characterId: characterCreated.id,
        number: 2,
        title: talents.skill.title,
        text: talents.skill.text,
        image: talents.skill.image,
      },
    });

    await prisma.characterTalents.create({
      data: {
        characterId: characterCreated.id,
        number: 3,
        title: talents.burst.title,
        text: talents.burst.text,
        image: talents.burst.image,
      },
    });

    //insert characterConstellations
    for (const [key, value] of Object.entries(constellations)) {
      await prisma.characterConstellations.create({
        data: {
          characterId: characterCreated.id,
          number: value.number,
          title: value.title,
          text: value.text,
          image: value.image,
        },
      });
    }

    const charAscensions = value.ascensions;
    //insert characterAscensions
    //func here
    for (const [key, value] of Object.entries(charAscensions)) {
      await prisma.characterAscensions.create({
        data: {
          characterId: characterCreated.id,
          title: value.title,
          text: value.text,
          image: value.image,
        },
      });
    }
  }

  //BONUS: weaponMats -> there's no JSON with data yet
  // table weapons would become weaponTypes and create new table weapons for a list of all weapons
  //func here

  //BONUS enemyMats -> add variety needed for the weapons

  //BONUS: dungeons -> dungeons.weaponDungeons

  console.log('STATUS: DB Seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
