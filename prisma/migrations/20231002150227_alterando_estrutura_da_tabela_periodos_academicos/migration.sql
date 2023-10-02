/*
  Warnings:

  - You are about to drop the column `modalidade_ingresso` on the `periodos_academicos` table. All the data in the column will be lost.
  - Added the required column `portador_de_diploma` to the `periodos_academicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferencia_externa` to the `periodos_academicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferencia_interna_curso` to the `periodos_academicos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferencia_interna_turno` to the `periodos_academicos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `periodos_academicos` DROP COLUMN `modalidade_ingresso`,
    ADD COLUMN `portador_de_diploma` BOOLEAN NOT NULL,
    ADD COLUMN `transferencia_externa` BOOLEAN NOT NULL,
    ADD COLUMN `transferencia_interna_curso` BOOLEAN NOT NULL,
    ADD COLUMN `transferencia_interna_turno` BOOLEAN NOT NULL;
