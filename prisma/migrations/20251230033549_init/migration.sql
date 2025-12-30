/*
  Warnings:

  - You are about to drop the `activation_codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analyzers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `devices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `analyzers` DROP FOREIGN KEY `analyzers_machine_id_fkey`;

-- DropForeignKey
ALTER TABLE `devices` DROP FOREIGN KEY `devices_license_code_fkey`;

-- DropTable
DROP TABLE `activation_codes`;

-- DropTable
DROP TABLE `analyzers`;

-- DropTable
DROP TABLE `devices`;
