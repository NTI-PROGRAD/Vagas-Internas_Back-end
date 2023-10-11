/*
  Warnings:

  - You are about to drop the column `diplomaBearer` on the `academic_periods` table. All the data in the column will be lost.
  - You are about to drop the column `externalTransfer` on the `academic_periods` table. All the data in the column will be lost.
  - You are about to drop the column `internalClassTimeTransfer` on the `academic_periods` table. All the data in the column will be lost.
  - You are about to drop the column `internalCourseTransfer` on the `academic_periods` table. All the data in the column will be lost.
  - The primary key for the `place_offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `afternoonClasses` on the `place_offers` table. All the data in the column will be lost.
  - You are about to drop the column `fullTimeClasses` on the `place_offers` table. All the data in the column will be lost.
  - You are about to drop the column `morningClasses` on the `place_offers` table. All the data in the column will be lost.
  - You are about to drop the column `nightClasses` on the `place_offers` table. All the data in the column will be lost.
  - Added the required column `afternoon` to the `place_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `afternoonNight` to the `place_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryModality` to the `place_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morning` to the `place_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morningAfternoon` to the `place_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `night` to the `place_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `academic_periods` DROP COLUMN `diplomaBearer`,
    DROP COLUMN `externalTransfer`,
    DROP COLUMN `internalClassTimeTransfer`,
    DROP COLUMN `internalCourseTransfer`;

-- AlterTable
ALTER TABLE `place_offers` DROP PRIMARY KEY,
    DROP COLUMN `afternoonClasses`,
    DROP COLUMN `fullTimeClasses`,
    DROP COLUMN `morningClasses`,
    DROP COLUMN `nightClasses`,
    ADD COLUMN `afternoon` INTEGER NOT NULL,
    ADD COLUMN `afternoonNight` INTEGER NOT NULL,
    ADD COLUMN `entryModality` ENUM('InternalCourseTransfer', 'InternalClassTimeTransfer', 'ExternalTransfer', 'DiplomaBearer') NOT NULL,
    ADD COLUMN `morning` INTEGER NOT NULL,
    ADD COLUMN `morningAfternoon` INTEGER NOT NULL,
    ADD COLUMN `night` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idCourse`, `idAcademicPeriod`, `entryModality`);
