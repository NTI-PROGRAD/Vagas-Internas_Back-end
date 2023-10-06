/*
  Warnings:

  - A unique constraint covering the columns `[idCourse]` on the table `courses_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCourse` to the `courses_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses_accounts` ADD COLUMN `idCourse` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `courses_accounts_idCourse_key` ON `courses_accounts`(`idCourse`);

-- AddForeignKey
ALTER TABLE `courses_accounts` ADD CONSTRAINT `courses_accounts_idCourse_fkey` FOREIGN KEY (`idCourse`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
