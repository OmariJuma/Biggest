/*
  Warnings:

  - Added the required column `Condition` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Location` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `Condition` VARCHAR(191) NOT NULL,
    ADD COLUMN `Location` VARCHAR(191) NOT NULL,
    ADD COLUMN `subCategory` VARCHAR(191) NOT NULL,
    ADD COLUMN `subCategoryId` VARCHAR(191) NOT NULL;
