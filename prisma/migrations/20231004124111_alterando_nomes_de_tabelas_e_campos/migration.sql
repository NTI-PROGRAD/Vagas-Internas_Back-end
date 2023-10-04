/*
  Warnings:

  - You are about to drop the `administradores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coordenacao_obtem_prazo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coordenacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cursos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oferta_de_vagas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `periodos_academicos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prazos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `coordenacao_obtem_prazo` DROP FOREIGN KEY `coordenacao_obtem_prazo_id_coordenacao_fkey`;

-- DropForeignKey
ALTER TABLE `coordenacao_obtem_prazo` DROP FOREIGN KEY `coordenacao_obtem_prazo_id_prazo_fkey`;

-- DropForeignKey
ALTER TABLE `oferta_de_vagas` DROP FOREIGN KEY `oferta_de_vagas_id_curso_fkey`;

-- DropForeignKey
ALTER TABLE `oferta_de_vagas` DROP FOREIGN KEY `oferta_de_vagas_id_periodo_academico_fkey`;

-- DropForeignKey
ALTER TABLE `periodos_academicos` DROP FOREIGN KEY `periodos_academicos_id_administrador_fkey`;

-- DropForeignKey
ALTER TABLE `prazos` DROP FOREIGN KEY `prazos_id_administrador_fkey`;

-- DropTable
DROP TABLE `administradores`;

-- DropTable
DROP TABLE `coordenacao_obtem_prazo`;

-- DropTable
DROP TABLE `coordenacoes`;

-- DropTable
DROP TABLE `cursos`;

-- DropTable
DROP TABLE `oferta_de_vagas`;

-- DropTable
DROP TABLE `periodos_academicos`;

-- DropTable
DROP TABLE `prazos`;

-- CreateTable
CREATE TABLE `administrators_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneContact` VARCHAR(191) NULL,

    UNIQUE INDEX `administrators_accounts_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `granted_times` (
    `id` VARCHAR(191) NOT NULL,
    `idAdministratorAccount` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneContact` VARCHAR(191) NULL,

    UNIQUE INDEX `courses_accounts_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses_accounts_get_granted_times` (
    `idGrantedTime` VARCHAR(191) NOT NULL,
    `idCourseAccount` VARCHAR(191) NOT NULL,
    `momento_da_concessao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idGrantedTime`, `idCourseAccount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `campus` VARCHAR(191) NOT NULL,
    `academicDegree` VARCHAR(191) NOT NULL,
    `classesTime` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `place_offers` (
    `idCourse` VARCHAR(191) NOT NULL,
    `idAcademicPeriod` VARCHAR(191) NOT NULL,
    `morningClasses` INTEGER NOT NULL,
    `afternoonClasses` INTEGER NOT NULL,
    `nightClasses` INTEGER NOT NULL,
    `fullTimeClasses` INTEGER NOT NULL,

    PRIMARY KEY (`idCourse`, `idAcademicPeriod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_periods` (
    `id` VARCHAR(191) NOT NULL,
    `idAdministratorAccount` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `activePeriod` BOOLEAN NOT NULL,
    `internalCourseTransfer` BOOLEAN NOT NULL,
    `internalClassTimeTransfer` BOOLEAN NOT NULL,
    `externalTransfer` BOOLEAN NOT NULL,
    `diplomaBearer` BOOLEAN NOT NULL,

    UNIQUE INDEX `academic_periods_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `granted_times` ADD CONSTRAINT `granted_times_idAdministratorAccount_fkey` FOREIGN KEY (`idAdministratorAccount`) REFERENCES `administrators_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses_accounts_get_granted_times` ADD CONSTRAINT `courses_accounts_get_granted_times_idGrantedTime_fkey` FOREIGN KEY (`idGrantedTime`) REFERENCES `granted_times`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses_accounts_get_granted_times` ADD CONSTRAINT `courses_accounts_get_granted_times_idCourseAccount_fkey` FOREIGN KEY (`idCourseAccount`) REFERENCES `courses_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `place_offers` ADD CONSTRAINT `place_offers_idCourse_fkey` FOREIGN KEY (`idCourse`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `place_offers` ADD CONSTRAINT `place_offers_idAcademicPeriod_fkey` FOREIGN KEY (`idAcademicPeriod`) REFERENCES `academic_periods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `academic_periods` ADD CONSTRAINT `academic_periods_idAdministratorAccount_fkey` FOREIGN KEY (`idAdministratorAccount`) REFERENCES `administrators_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
