/*
  Warnings:

  - You are about to drop the column `momento_da_concessao` on the `courses_accounts_get_granted_times` table. All the data in the column will be lost.
  - Added the required column `grantDatetime` to the `courses_accounts_get_granted_times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses_accounts_get_granted_times` DROP COLUMN `momento_da_concessao`,
    ADD COLUMN `grantDatetime` DATETIME(3) NOT NULL;
