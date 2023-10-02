import { PrismaClient, } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main()
{
  await prisma.periodoAcademico.deleteMany({});
  await prisma.administrador.deleteMany({});
  await prisma.coordenacao.deleteMany({});

  const administrator1 = await prisma.administrador.create({
    data: {
      login: "emily",
      senha: await bcrypt.hash("12345", 10),
      email: "emily.pires@ufpe.br",
    },
  });

  const administrator2 = await prisma.administrador.create({
    data: {
      login: "rafael",
      senha: await bcrypt.hash("12345", 10),
      email: "rafael.anthony@ufpe.br",
    },
  });

  const administrator3 = await prisma.administrador.create({
    data: {
      login: "cecilia",
      senha: await bcrypt.hash("12345", 10),
      email: "cecilia.drumond@ufpe.br",
    },
  });

  const administrator4 = await prisma.administrador.create({
    data: {
      login: "francisco",
      senha: await bcrypt.hash("12345", 10),
      email: "francisco.barros@ufpe.br",
    },
  });

  const administrator5 = await prisma.administrador.create({
    data: {
      login: "leonardo",
      senha: await bcrypt.hash("12345", 10),
      email: "leonardo.fogaca@ufpe.br",
    },
  });

  const coordinator1 = await prisma.coordenacao.create({
    data: {
      login: "coordenacao_letras",
      senha: await bcrypt.hash("12345", 10),
      email: "coord_letras@ufpe.br",
    },
  });
  
  const coordinator2 = await prisma.coordenacao.create({
    data: {
      login: "coordenacao_arquitetura_urbanismo",
      senha: await bcrypt.hash("12345", 10),
      email: "coord_arquiteturaurbanismo@ufpe.br",
    },
  });

  const periodoAcademico = await prisma.periodoAcademico.create({
    data: {
      id_administrador: administrator1.id,
      rotulo: "2023.2",
      periodo_ativo: true,
      portador_de_diploma: true,
      transferencia_externa: false,
      transferencia_interna_turno: true,
      transferencia_interna_curso: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });