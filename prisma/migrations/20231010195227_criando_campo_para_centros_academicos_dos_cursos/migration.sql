/*
  Warnings:

  - Added the required column `academicCenter` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `academicCenter` ENUM('CAC', 'CB', 'CCEN', 'CCJ', 'CCS', 'CCM', 'CCSA', 'CE', 'CFCH', 'CIn', 'CTG', 'CAA', 'CAV') NOT NULL;
