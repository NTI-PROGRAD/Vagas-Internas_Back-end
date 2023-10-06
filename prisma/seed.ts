import { PrismaClient, } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main()
{
  await prisma.placesOffer.deleteMany({});
  await prisma.courseAccountGetGrantedTime.deleteMany({});

  await prisma.grantedTime.deleteMany({});
  await prisma.courseAccount.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.academicPeriod.deleteMany({});
  await prisma.administratorAccount.deleteMany({});

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

  const course1 = await prisma.course.create({
    data: {
      name: "Administração",
      classesTime: "Integral",
      campus: "Recife",
      academicDegree: "Bacharelado",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "Arqueologia",
      classesTime: "Integral",
      campus: "Recife",
      academicDegree: "Bacharelado",
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: "Arquitetura e Urbanismo",
      classesTime: "Integral",
      campus: "Recife",
      academicDegree: "Bacharelado",
    },
  });

  const course4 = await prisma.course.create({
    data: {
      name: "Artes Visuais",
      classesTime: "Integral",
      campus: "Recife",
      academicDegree: "Bacharelado",
    },
  });

  const course5 = await prisma.course.create({
    data: {
      name: "Artes Visuais",
      classesTime: "Integral",
      campus: "Recife",
      academicDegree: "Licenciatura",
    },
  });

  const courseAccount1 = await prisma.courseAccount.create({
    data: {
      login: "administracao_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.administracao@ufpe.br",

    },
  });
  
  const courseAccount2 = await prisma.courseAccount.create({
    data: {
      login: "arqueologia_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.arqueologia@ufpe.br",
    },
  });
  
  const courseAccount3 = await prisma.courseAccount.create({
    data: {
      login: "arquitetura_e_urbanismo_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.arquiteturaurbanismo@ufpe.br",
    },
  });

  const courseAccount4 = await prisma.courseAccount.create({
    data: {
      login: "artes_visuais_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.artesvisuais@ufpe.br",
    },
  });

  const courseAccount5 = await prisma.courseAccount.create({
    data: {
      login: "artes_visuais_licenciatura_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.artesvisuais@ufpe.br",
    },
  });

  const academicPeriod1 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2023.2",
      activePeriod: false,
      diplomaBearer: true,
      externalTransfer: false,
      internalClassTimeTransfer: true,
      internalCourseTransfer: true,
    },
  });
  
  const academicPeriod2 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2024.1",
      activePeriod: true,
      diplomaBearer: true,
      externalTransfer: false,
      internalClassTimeTransfer: true,
      internalCourseTransfer: true,
    },
  });

  const academicPeriod3 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2024.2",
      activePeriod: false,
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