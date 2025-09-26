/*
  Warnings:

  - You are about to drop the `activation_codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `devices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `activation_codes`;

-- DropTable
DROP TABLE `audit_logs`;

-- DropTable
DROP TABLE `devices`;

-- CreateTable
CREATE TABLE `ActivationCode` (
    `code` VARCHAR(128) NOT NULL,
    `issuedTo` VARCHAR(255) NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `boundTo` VARCHAR(255) NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Device` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `machineId` VARCHAR(255) NOT NULL,
    `licenseCode` VARCHAR(128) NULL,
    `licensePayload` TEXT NULL,
    `licenseSignature` TEXT NULL,
    `activatedAt` DATETIME(3) NULL,
    `lastHeartbeat` DATETIME(3) NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Device_machineId_key`(`machineId`),
    UNIQUE INDEX `Device_licenseCode_key`(`licenseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_licenseCode_fkey` FOREIGN KEY (`licenseCode`) REFERENCES `ActivationCode`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;
