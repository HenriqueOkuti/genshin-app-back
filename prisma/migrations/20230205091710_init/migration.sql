/*
  Warnings:

  - You are about to drop the column `bossId` on the `BossMats` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `BossMats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `BossMats` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CharacterAscensions` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CharacterConstellations` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CharacterTalents` table. All the data in the column will be lost.
  - You are about to drop the column `enemyMatId` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the column `imageFace` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the column `imageSplashArt` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Characters` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `DungeonMats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `DungeonMats` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Dungeons` table. All the data in the column will be lost.
  - You are about to drop the column `enemyId` on the `EnemyMats` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `EnemyMats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `EnemyMats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Gems` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `LocalSpecialty` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `LocalSpecialty` table. All the data in the column will be lost.
  - You are about to drop the column `taskInfoId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `constelation` on the `UserCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `talentA` on the `UserCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `talentB` on the `UserCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `talentC` on the `UserCharacters` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `WeeklyBossMats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `WeeklyBossMats` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyBossId` on the `WeeklyBossMats` table. All the data in the column will be lost.
  - You are about to drop the `BossGems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bosses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enemies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThemeHexes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Themes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyBossGems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyBosses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `key` to the `BossMats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `DungeonMats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `DungeonMats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `EnemyMats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `LocalSpecialty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `TaskInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `WeeklyBossMats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BossGems" DROP CONSTRAINT "BossGems_bossId_fkey";

-- DropForeignKey
ALTER TABLE "BossGems" DROP CONSTRAINT "BossGems_gemId_fkey";

-- DropForeignKey
ALTER TABLE "BossMats" DROP CONSTRAINT "BossMats_bossId_fkey";

-- DropForeignKey
ALTER TABLE "Bosses" DROP CONSTRAINT "Bosses_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Characters" DROP CONSTRAINT "Characters_enemyMatId_fkey";

-- DropForeignKey
ALTER TABLE "EnemyMats" DROP CONSTRAINT "EnemyMats_enemyId_fkey";

-- DropForeignKey
ALTER TABLE "Gems" DROP CONSTRAINT "Gems_elementId_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_taskInfoId_fkey";

-- DropForeignKey
ALTER TABLE "ThemeHexes" DROP CONSTRAINT "ThemeHexes_themeId_fkey";

-- DropForeignKey
ALTER TABLE "UserTasks" DROP CONSTRAINT "UserTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserTasks" DROP CONSTRAINT "UserTasks_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBossGems" DROP CONSTRAINT "WeeklyBossGems_gemId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBossGems" DROP CONSTRAINT "WeeklyBossGems_weeklyBossId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBossMats" DROP CONSTRAINT "WeeklyBossMats_weeklyBossId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyBosses" DROP CONSTRAINT "WeeklyBosses_regionId_fkey";

-- AlterTable
ALTER TABLE "BackpackInfo" ADD COLUMN     "weaponMat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weeklyBossMat" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "bossMat" SET DEFAULT false,
ALTER COLUMN "dungeonMat" SET DEFAULT false,
ALTER COLUMN "enemyMat" SET DEFAULT false,
ALTER COLUMN "localSpecialty" SET DEFAULT false;

-- AlterTable
ALTER TABLE "BossMats" DROP COLUMN "bossId",
DROP COLUMN "image",
DROP COLUMN "text",
ADD COLUMN     "key" VARCHAR(255) NOT NULL,
ADD COLUMN     "rarity" INTEGER NOT NULL DEFAULT 4;

-- AlterTable
ALTER TABLE "CharacterAscensions" DROP COLUMN "image",
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CharacterConstellations" DROP COLUMN "image",
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CharacterTalents" DROP COLUMN "image",
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Characters" DROP COLUMN "enemyMatId",
DROP COLUMN "imageFace",
DROP COLUMN "imageSplashArt",
DROP COLUMN "releaseDate";

-- AlterTable
ALTER TABLE "DungeonMats" DROP COLUMN "image",
DROP COLUMN "text",
ADD COLUMN     "class" VARCHAR(255) NOT NULL,
ADD COLUMN     "key" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Dungeons" DROP COLUMN "image",
ALTER COLUMN "text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EnemyMats" DROP COLUMN "enemyId",
DROP COLUMN "image",
DROP COLUMN "text",
ADD COLUMN     "key" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Gems" DROP COLUMN "text";

-- AlterTable
ALTER TABLE "LocalSpecialty" DROP COLUMN "image",
DROP COLUMN "text",
ADD COLUMN     "key" VARCHAR(255) NOT NULL,
ADD COLUMN     "rarity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "TaskInfo" ADD COLUMN     "taskId" INTEGER NOT NULL,
ADD COLUMN     "weeklyBossMat" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "bossMat" SET DEFAULT false,
ALTER COLUMN "dungeonMat" SET DEFAULT false,
ALTER COLUMN "enemyMat" SET DEFAULT false,
ALTER COLUMN "localSpecialty" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "taskInfoId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserCharacters" DROP COLUMN "constelation",
DROP COLUMN "talentA",
DROP COLUMN "talentB",
DROP COLUMN "talentC";

-- AlterTable
ALTER TABLE "WeeklyBossMats" DROP COLUMN "image",
DROP COLUMN "text",
DROP COLUMN "weeklyBossId",
ADD COLUMN     "key" VARCHAR(255) NOT NULL,
ADD COLUMN     "rarity" INTEGER NOT NULL DEFAULT 5;

-- DropTable
DROP TABLE "BossGems";

-- DropTable
DROP TABLE "Bosses";

-- DropTable
DROP TABLE "Enemies";

-- DropTable
DROP TABLE "ThemeHexes";

-- DropTable
DROP TABLE "Themes";

-- DropTable
DROP TABLE "UserTasks";

-- DropTable
DROP TABLE "WeeklyBossGems";

-- DropTable
DROP TABLE "WeeklyBosses";

-- CreateTable
CREATE TABLE "UserAscensions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userCharacterId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserAscensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserConstellations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userCharacterId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserConstellations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTalents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userCharacterId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "talentId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserTalents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterEnemyMats" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "enemyMatId" INTEGER NOT NULL,

    CONSTRAINT "CharacterEnemyMats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempItems" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weeklyBossMat" BOOLEAN NOT NULL DEFAULT false,
    "bossMat" BOOLEAN NOT NULL DEFAULT false,
    "dungeonMat" BOOLEAN NOT NULL DEFAULT false,
    "enemyMat" BOOLEAN NOT NULL DEFAULT false,
    "localSpecialty" BOOLEAN NOT NULL DEFAULT false,
    "weaponMat" BOOLEAN NOT NULL DEFAULT false,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "rarity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "TempItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempTransaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "isPost" BOOLEAN NOT NULL DEFAULT false,
    "isPut" BOOLEAN NOT NULL DEFAULT false,
    "originalTaskId" INTEGER,

    CONSTRAINT "TempTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Index_userId" ON "TempTransaction"("userId");

-- AddForeignKey
ALTER TABLE "TaskInfo" ADD CONSTRAINT "TaskInfo_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAscensions" ADD CONSTRAINT "UserAscensions_userCharacterId_fkey" FOREIGN KEY ("userCharacterId") REFERENCES "UserCharacters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAscensions" ADD CONSTRAINT "UserAscensions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConstellations" ADD CONSTRAINT "UserConstellations_userCharacterId_fkey" FOREIGN KEY ("userCharacterId") REFERENCES "UserCharacters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConstellations" ADD CONSTRAINT "UserConstellations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTalents" ADD CONSTRAINT "UserTalents_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "CharacterTalents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTalents" ADD CONSTRAINT "UserTalents_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTalents" ADD CONSTRAINT "UserTalents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEnemyMats" ADD CONSTRAINT "CharacterEnemyMats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterEnemyMats" ADD CONSTRAINT "CharacterEnemyMats_enemyMatId_fkey" FOREIGN KEY ("enemyMatId") REFERENCES "EnemyMats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempItems" ADD CONSTRAINT "TempItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempTransaction" ADD CONSTRAINT "TempTransaction_originalTaskId_fkey" FOREIGN KEY ("originalTaskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempTransaction" ADD CONSTRAINT "TempTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
