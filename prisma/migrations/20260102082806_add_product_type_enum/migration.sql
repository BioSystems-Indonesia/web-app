-- AlterTable
ALTER TABLE `product` ADD COLUMN `productType` ENUM('Clinical', 'FoodAndBeverage') NOT NULL DEFAULT 'Clinical';

-- AlterTable
ALTER TABLE `productcategory` ADD COLUMN `categoryType` ENUM('Clinical', 'FoodAndBeverage') NOT NULL DEFAULT 'Clinical';
