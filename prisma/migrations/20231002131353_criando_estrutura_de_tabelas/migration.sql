-- CreateTable
CREATE TABLE `administradores` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prazos` (
    `id` VARCHAR(191) NOT NULL,
    `id_administrador` VARCHAR(191) NOT NULL,
    `inicio_do_prazo` DATETIME(3) NOT NULL,
    `fim_do_prazo` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coordenacoes` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coordenacao_obtem_prazo` (
    `id_prazo` VARCHAR(191) NOT NULL,
    `id_coordenacao` VARCHAR(191) NOT NULL,
    `momento_da_concessao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_prazo`, `id_coordenacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `campus` VARCHAR(191) NOT NULL,
    `modalidade` VARCHAR(191) NOT NULL,
    `turno` ENUM('Matutino', 'Vespertino', 'Noturno', 'Integral') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodos_academicos` (
    `id` VARCHAR(191) NOT NULL,
    `id_administrador` VARCHAR(191) NOT NULL,
    `rotulo` VARCHAR(191) NOT NULL,
    `modalidade_ingresso` ENUM('Transferencia_Interna_de_Curso', 'Transferencia_Interna_de_Turno', 'Transferencia_Externa', 'Portador_de_Diploma') NOT NULL,
    `periodo_ativo` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oferta_de_vagas` (
    `id_curso` VARCHAR(191) NOT NULL,
    `id_periodo_academico` VARCHAR(191) NOT NULL,
    `turno_matutino` INTEGER NOT NULL,
    `turno_vespertino` INTEGER NOT NULL,
    `turno_noturno` INTEGER NOT NULL,
    `turno_integral` INTEGER NOT NULL,

    PRIMARY KEY (`id_curso`, `id_periodo_academico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prazos` ADD CONSTRAINT `prazos_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `administradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coordenacao_obtem_prazo` ADD CONSTRAINT `coordenacao_obtem_prazo_id_prazo_fkey` FOREIGN KEY (`id_prazo`) REFERENCES `prazos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coordenacao_obtem_prazo` ADD CONSTRAINT `coordenacao_obtem_prazo_id_coordenacao_fkey` FOREIGN KEY (`id_coordenacao`) REFERENCES `coordenacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodos_academicos` ADD CONSTRAINT `periodos_academicos_id_administrador_fkey` FOREIGN KEY (`id_administrador`) REFERENCES `administradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oferta_de_vagas` ADD CONSTRAINT `oferta_de_vagas_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oferta_de_vagas` ADD CONSTRAINT `oferta_de_vagas_id_periodo_academico_fkey` FOREIGN KEY (`id_periodo_academico`) REFERENCES `periodos_academicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
