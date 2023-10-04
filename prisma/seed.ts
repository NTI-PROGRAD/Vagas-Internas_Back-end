import { PrismaClient, } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main()
{
  await prisma.academicPeriod.deleteMany({});
  await prisma.administratorAccount.deleteMany({});
  await prisma.courseAccount.deleteMany({});

  const administratorAccount1 = await prisma.administratorAccount.create({
    data: {
      login: "emily",
      password: await bcrypt.hash("12345", 10),
      email: "emily.pires@ufpe.br",
    },
  });

  const administratorAccount2 = await prisma.administratorAccount.create({
    data: {
      login: "rafael",
      password: await bcrypt.hash("12345", 10),
      email: "rafael.anthony@ufpe.br",
    },
  });

  const administratorAccount3 = await prisma.administratorAccount.create({
    data: {
      login: "cecilia",
      password: await bcrypt.hash("12345", 10),
      email: "cecilia.drumond@ufpe.br",
    },
  });

  const administratorAccount4 = await prisma.administratorAccount.create({
    data: {
      login: "francisco",
      password: await bcrypt.hash("12345", 10),
      email: "francisco.barros@ufpe.br",
    },
  });

  const administratorAccount5 = await prisma.administratorAccount.create({
    data: {
      login: "leonardo",
      password: await bcrypt.hash("12345", 10),
      email: "leonardo.fogaca@ufpe.br",
    },
  });

  const courseAccount1 = await prisma.courseAccount.create({
    data: {
      login: "coordenacao_letras",
      password: await bcrypt.hash("12345", 10),
      email: "coord_letras@ufpe.br",
    },
  });
  
  const courseAccount2 = await prisma.courseAccount.create({
    data: {
      login: "coordenacao_arquitetura_urbanismo",
      password: await bcrypt.hash("12345", 10),
      email: "coord_arquiteturaurbanismo@ufpe.br",
    },
  });

  const periodoAcademico = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2023.2",
      activePeriod: true,
      diplomaBearer: true,
      externalTransfer: false,
      internalClassTimeTransfer: true,
      internalCourseTransfer: true,
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