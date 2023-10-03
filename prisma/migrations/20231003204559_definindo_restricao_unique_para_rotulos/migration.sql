/*
  Warnings:

  - A unique constraint covering the columns `[rotulo]` on the table `periodos_academicos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `periodos_academicos_rotulo_key` ON `periodos_academicos`(`rotulo`);
