/*
  Warnings:

  - You are about to alter the column `campus` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `academicDegree` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - The values [Integral] on the enum `courses_classesTime` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `campus` ENUM('Recife', 'Caruaru', 'Vitoria') NOT NULL,
    MODIFY `academicDegree` ENUM('Bacharelado', 'Licenciatura') NOT NULL,
    MODIFY `classesTime` ENUM('Matutino', 'Matutino_Vespertino', 'Vespertino', 'Vespertino_Noturno', 'Noturno') NOT NULL;
