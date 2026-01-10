/*
  Warnings:

  - You are about to alter the column `name` on the `role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropForeignKey
ALTER TABLE `authentication` DROP FOREIGN KEY `Authentication_userId_fkey`;

-- AlterTable
ALTER TABLE `authentication` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `name` ENUM('HUMAN_RESOURCE', 'PRODUCT_SPECIALIST', 'ADMIN') NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Authentication` ADD CONSTRAINT `Authentication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
