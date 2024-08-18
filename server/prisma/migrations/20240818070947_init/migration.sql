/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `firstName` VARCHAR(191) NOT NULL DEFAULT 'null',
    ADD COLUMN `phoneNo` VARCHAR(191) NOT NULL DEFAULT 'null',
    ADD COLUMN `secondName` VARCHAR(191) NOT NULL DEFAULT 'null',
    MODIFY `password` VARCHAR(191) NOT NULL;
