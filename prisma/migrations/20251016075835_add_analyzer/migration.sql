-- CreateTable
CREATE TABLE `analyzers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analyzer_code` VARCHAR(64) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `manufacturer` VARCHAR(255) NULL,
    `model` VARCHAR(100) NULL,
    `serial_number` VARCHAR(100) NULL,
    `connection_type` VARCHAR(50) NULL,
    `connection_info` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `last_sync_at` DATETIME(3) NULL,
    `machine_id` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `analyzers_analyzer_code_key`(`analyzer_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `analyzers` ADD CONSTRAINT `analyzers_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `devices`(`machine_id`) ON DELETE CASCADE ON UPDATE CASCADE;
