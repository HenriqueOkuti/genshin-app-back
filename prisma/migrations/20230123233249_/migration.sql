-- CreateTable
CREATE TABLE "BackpackInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bossMat" BOOLEAN NOT NULL,
    "dungeonMat" BOOLEAN NOT NULL,
    "enemyMat" BOOLEAN NOT NULL,
    "localSpecialty" BOOLEAN NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "BackpackInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BossGems" (
    "id" SERIAL NOT NULL,
    "bossId" INTEGER NOT NULL,
    "gemId" INTEGER NOT NULL,

    CONSTRAINT "BossGems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BossMats" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "bossId" INTEGER NOT NULL,

    CONSTRAINT "BossMats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bosses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Bosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterAscensions" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "CharacterAscensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterConstellations" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "CharacterConstellations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterTalents" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "CharacterTalents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "elementId" INTEGER NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "imageSplashArt" VARCHAR(255) NOT NULL,
    "imageFace" VARCHAR(255) NOT NULL,
    "releaseDate" DATE NOT NULL,
    "localSpecialtyId" INTEGER NOT NULL,
    "enemyMatId" INTEGER NOT NULL,
    "dungeonMatId" INTEGER NOT NULL,
    "bossMatId" INTEGER NOT NULL,
    "weeklyBossMatId" INTEGER NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DungeonMats" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "day" VARCHAR(255) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "dungeonId" INTEGER NOT NULL,
    "weaponMat" BOOLEAN NOT NULL,
    "characterMat" BOOLEAN NOT NULL,

    CONSTRAINT "DungeonMats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dungeons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Dungeons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Elements" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Enemies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnemyMats" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "enemyId" INTEGER NOT NULL,

    CONSTRAINT "EnemyMats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gems" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "rarity" INTEGER NOT NULL,
    "elementId" INTEGER NOT NULL,

    CONSTRAINT "Gems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalSpecialty" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "LocalSpecialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskInfo" (
    "id" SERIAL NOT NULL,
    "bossMat" BOOLEAN NOT NULL,
    "dungeonMat" BOOLEAN NOT NULL,
    "enemyMat" BOOLEAN NOT NULL,
    "localSpecialty" BOOLEAN NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "TaskInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "taskInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeHexes" (
    "id" SERIAL NOT NULL,
    "themeId" INTEGER NOT NULL,
    "hex1" VARCHAR(255) NOT NULL,
    "hex2" VARCHAR(255) NOT NULL,
    "hex3" VARCHAR(255) NOT NULL,
    "hex4" VARCHAR(255) NOT NULL,
    "hex5" VARCHAR(255) NOT NULL,
    "hex6" VARCHAR(255) NOT NULL,

    CONSTRAINT "ThemeHexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Themes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBackpack" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "backpackInfoId" INTEGER NOT NULL,

    CONSTRAINT "UserBackpack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCharacters" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "talentA" INTEGER NOT NULL DEFAULT 1,
    "talentB" INTEGER NOT NULL DEFAULT 1,
    "talentC" INTEGER NOT NULL DEFAULT 1,
    "constelation" INTEGER NOT NULL DEFAULT 0,
    "friendship" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserCharacters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTasks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "UserTasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT E'New User',
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL DEFAULT E'https://i.redd.it/02qhtmulmjs71.jpg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyBossGems" (
    "id" SERIAL NOT NULL,
    "weeklyBossId" INTEGER NOT NULL,
    "gemId" INTEGER NOT NULL,

    CONSTRAINT "WeeklyBossGems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyBossMats" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "weeklyBossId" INTEGER NOT NULL,

    CONSTRAINT "WeeklyBossMats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyBosses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "WeeklyBosses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Index_email" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "BossGems" ADD CONSTRAINT "BossGems_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "Bosses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BossGems" ADD CONSTRAINT "BossGems_gemId_fkey" FOREIGN KEY ("gemId") REFERENCES "Gems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BossMats" ADD CONSTRAINT "BossMats_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "Bosses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bosses" ADD CONSTRAINT "Bosses_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAscensions" ADD CONSTRAINT "CharacterAscensions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterConstellations" ADD CONSTRAINT "CharacterConstellations_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterTalents" ADD CONSTRAINT "CharacterTalents_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_bossMatId_fkey" FOREIGN KEY ("bossMatId") REFERENCES "BossMats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_dungeonMatId_fkey" FOREIGN KEY ("dungeonMatId") REFERENCES "DungeonMats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Elements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_enemyMatId_fkey" FOREIGN KEY ("enemyMatId") REFERENCES "EnemyMats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_localSpecialtyId_fkey" FOREIGN KEY ("localSpecialtyId") REFERENCES "LocalSpecialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_weeklyBossMatId_fkey" FOREIGN KEY ("weeklyBossMatId") REFERENCES "WeeklyBossMats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DungeonMats" ADD CONSTRAINT "DungeonMats_dungeonId_fkey" FOREIGN KEY ("dungeonId") REFERENCES "Dungeons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dungeons" ADD CONSTRAINT "Dungeons_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnemyMats" ADD CONSTRAINT "EnemyMats_enemyId_fkey" FOREIGN KEY ("enemyId") REFERENCES "Enemies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gems" ADD CONSTRAINT "Gems_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Elements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_taskInfoId_fkey" FOREIGN KEY ("taskInfoId") REFERENCES "TaskInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeHexes" ADD CONSTRAINT "ThemeHexes_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBackpack" ADD CONSTRAINT "UserBackpack_backpackInfoId_fkey" FOREIGN KEY ("backpackInfoId") REFERENCES "BackpackInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBackpack" ADD CONSTRAINT "UserBackpack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacters" ADD CONSTRAINT "UserCharacters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacters" ADD CONSTRAINT "UserCharacters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTasks" ADD CONSTRAINT "UserTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTasks" ADD CONSTRAINT "UserTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBossGems" ADD CONSTRAINT "WeeklyBossGems_gemId_fkey" FOREIGN KEY ("gemId") REFERENCES "Gems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBossGems" ADD CONSTRAINT "WeeklyBossGems_weeklyBossId_fkey" FOREIGN KEY ("weeklyBossId") REFERENCES "WeeklyBosses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBossMats" ADD CONSTRAINT "WeeklyBossMats_weeklyBossId_fkey" FOREIGN KEY ("weeklyBossId") REFERENCES "WeeklyBosses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyBosses" ADD CONSTRAINT "WeeklyBosses_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
