/*
  Warnings:

  - You are about to drop the `activationcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_licenseCode_fkey`;

-- DropTable
DROP TABLE `activationcode`;

-- DropTable
DROP TABLE `device`;

-- CreateTable
CREATE TABLE `activation_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(64) NOT NULL,
    `issued_to` VARCHAR(255) NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `bound_to` VARCHAR(255) NULL,
    `expires_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `activation_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `machine_id` VARCHAR(255) NOT NULL,
    `license_code` VARCHAR(64) NOT NULL,
    `license_payload` TEXT NOT NULL,
    `license_signature` TEXT NOT NULL,
    `activated_at` DATETIME(3) NOT NULL,
    `last_heartbeat` DATETIME(3) NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `devices_machine_id_key`(`machine_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_license_code_fkey` FOREIGN KEY (`license_code`) REFERENCES `activation_codes`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
