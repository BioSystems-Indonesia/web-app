/*
  Warnings:

  - You are about to alter the column `productType` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `categoryType` on the `productcategory` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `productType` ENUM('CLINICAL', 'FOOD_AND_BEVERAGE') NOT NULL DEFAULT 'CLINICAL';

-- AlterTable
ALTER TABLE `productcategory` MODIFY `categoryType` ENUM('CLINICAL', 'FOOD_AND_BEVERAGE') NOT NULL DEFAULT 'CLINICAL';
