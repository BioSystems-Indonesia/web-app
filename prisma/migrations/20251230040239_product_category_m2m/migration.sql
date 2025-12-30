/*
  Warnings:

  - You are about to drop the column `productCategoryId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_productCategoryId_fkey`;

-- DropIndex
DROP INDEX `Product_productCategoryId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `productCategoryId`;

-- CreateTable
CREATE TABLE `_ProductToCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToCategory_AB_unique`(`A`, `B`),
    INDEX `_ProductToCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToCategory` ADD CONSTRAINT `_ProductToCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToCategory` ADD CONSTRAINT `_ProductToCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
