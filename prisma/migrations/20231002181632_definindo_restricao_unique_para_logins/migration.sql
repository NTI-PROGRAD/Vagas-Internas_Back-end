/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `administradores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `coordenacoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `administradores_login_key` ON `administradores`(`login`);

-- CreateIndex
CREATE UNIQUE INDEX `coordenacoes_login_key` ON `coordenacoes`(`login`);
