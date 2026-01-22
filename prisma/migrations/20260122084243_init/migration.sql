-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `checkIn` DATETIME(3) NULL,
    `checkOut` DATETIME(3) NULL,
    `status` ENUM('PRESENT', 'FULL_LEAVE', 'HALF_LEAVE', 'SICK', 'ABSENT', 'OUT_OF_OFFICE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttendancePenalty` (
    `id` VARCHAR(191) NOT NULL,
    `lateMinutes` INTEGER NOT NULL,
    `penaltyAmount` DECIMAL(65, 30) NOT NULL,
    `effectiveFrom` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `employeeCode` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `positionId` VARCHAR(191) NOT NULL,
    `joinDate` DATETIME(3) NOT NULL,
    `employmentStatus` ENUM('PERMANENT', 'PROBATION', 'CONTRACT') NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `nationalId` VARCHAR(191) NOT NULL,
    `salary` DECIMAL(65, 30) NOT NULL,
    `domicile` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `bankAccount` VARCHAR(191) NOT NULL,
    `bpjsNumber` VARCHAR(191) NULL,
    `taxNumber` VARCHAR(191) NULL,
    `role` ENUM('EMPLOYEE', 'KPI_AUDITOR', 'HR', 'MANAGER') NOT NULL DEFAULT 'EMPLOYEE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Employee_employeeCode_key`(`employeeCode`),
    UNIQUE INDEX `Employee_nationalId_key`(`nationalId`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `id` VARCHAR(191) NOT NULL,
    `assetCode` VARCHAR(191) NOT NULL,
    `assetType` VARCHAR(191) NOT NULL,
    `status` ENUM('AVAILABLE', 'ASSIGNED', 'DAMAGED') NOT NULL DEFAULT 'AVAILABLE',
    `categoryId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Inventory_assetCode_key`(`assetCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryCategory` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InventoryCategory_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryHandover` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `inventoryId` VARCHAR(191) NOT NULL,
    `handoverDate` DATETIME(3) NOT NULL,
    `conditionNotes` VARCHAR(191) NOT NULL,
    `signatureFile` VARCHAR(191) NOT NULL,
    `returnedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobdesk` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `positionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployeeJobdesk` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `jobdeskId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KPI` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `documentFile` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerformanceReview` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `workQuality` INTEGER NOT NULL,
    `communication` INTEGER NOT NULL,
    `workMethod` INTEGER NOT NULL,
    `problemSolving` INTEGER NOT NULL,
    `compliance` INTEGER NOT NULL,
    `discipline` INTEGER NOT NULL,
    `cleanliness` INTEGER NOT NULL,
    `initiative` INTEGER NOT NULL,
    `specialTaskScore` INTEGER NOT NULL,
    `weight` DOUBLE NOT NULL,
    `totalScore` DOUBLE NOT NULL,
    `ranking` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerformanceAudit` (
    `id` VARCHAR(191) NOT NULL,
    `auditorId` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `auditedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PerformanceAudit_auditorId_reviewId_key`(`auditorId`, `reviewId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KPIAudit` (
    `id` VARCHAR(191) NOT NULL,
    `auditorId` VARCHAR(191) NOT NULL,
    `kpiId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `score` DOUBLE NULL,
    `auditedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `KPIAudit_auditorId_kpiId_key`(`auditorId`, `kpiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `leaveType` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalDays` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `approvedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Position_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruitmentCandidate` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `domicile` VARCHAR(191) NOT NULL,
    `status` ENUM('RECEIVED', 'IN_REVIEW', 'INITIAL_INTERVIEW', 'TECHNICAL_TEST', 'PSYCHOLOGICAL_TEST', 'OFFERING', 'REJECTED') NOT NULL DEFAULT 'RECEIVED',
    `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `urlCV` VARCHAR(191) NOT NULL,
    `urlSelfPhoto` VARCHAR(191) NOT NULL,
    `urlPortfolio` VARCHAR(191) NULL,
    `coverLetter` VARCHAR(191) NULL,
    `expectedSalery` DECIMAL(65, 30) NOT NULL,
    `availabilityToStart` DATETIME(3) NOT NULL,
    `profesionalReference` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CandidateExperience` (
    `id` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `isStillWorking` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CandidateEducation` (
    `id` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `highestDegree` ENUM('HIGH_SCHOOL', 'DIPLOMA', 'BACHELORS_DEGREE', 'MASTERS_DEGREE', 'PHD') NOT NULL,
    `institutionName` VARCHAR(191) NOT NULL,
    `fieldOfStudy` VARCHAR(191) NOT NULL,
    `endYear` INTEGER NULL,
    `gpa` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruitmentStatusHistory` (
    `id` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `status` ENUM('RECEIVED', 'IN_REVIEW', 'INITIAL_INTERVIEW', 'TECHNICAL_TEST', 'PSYCHOLOGICAL_TEST', 'OFFERING', 'REJECTED') NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SOPArchive` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,
    `effectiveAt` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `InventoryCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryHandover` ADD CONSTRAINT `InventoryHandover_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryHandover` ADD CONSTRAINT `InventoryHandover_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jobdesk` ADD CONSTRAINT `Jobdesk_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeJobdesk` ADD CONSTRAINT `EmployeeJobdesk_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeJobdesk` ADD CONSTRAINT `EmployeeJobdesk_jobdeskId_fkey` FOREIGN KEY (`jobdeskId`) REFERENCES `Jobdesk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KPI` ADD CONSTRAINT `KPI_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerformanceReview` ADD CONSTRAINT `PerformanceReview_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerformanceAudit` ADD CONSTRAINT `PerformanceAudit_auditorId_fkey` FOREIGN KEY (`auditorId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerformanceAudit` ADD CONSTRAINT `PerformanceAudit_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `PerformanceReview`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KPIAudit` ADD CONSTRAINT `KPIAudit_auditorId_fkey` FOREIGN KEY (`auditorId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KPIAudit` ADD CONSTRAINT `KPIAudit_kpiId_fkey` FOREIGN KEY (`kpiId`) REFERENCES `KPI`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidateExperience` ADD CONSTRAINT `CandidateExperience_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `RecruitmentCandidate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CandidateEducation` ADD CONSTRAINT `CandidateEducation_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `RecruitmentCandidate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecruitmentStatusHistory` ADD CONSTRAINT `RecruitmentStatusHistory_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `RecruitmentCandidate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
