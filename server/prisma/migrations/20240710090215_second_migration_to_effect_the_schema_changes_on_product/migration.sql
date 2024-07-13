/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `categoryId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `subCategory` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;
