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
      classesTime: "Matutino_Vespertino",
      campus: "Recife",
      academicDegree: "Bacharelado",
      academicCenter: "CCSA",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "Arqueologia",
      classesTime: "Matutino_Vespertino",
      campus: "Recife",
      academicDegree: "Bacharelado",
      academicCenter: "CFCH",
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: "Arquitetura e Urbanismo",
      classesTime: "Matutino_Vespertino",
      campus: "Recife",
      academicDegree: "Bacharelado",
      academicCenter: "CAC",
    },
  });

  const course4 = await prisma.course.create({
    data: {
      name: "Artes Visuais",
      classesTime: "Matutino_Vespertino",
      campus: "Recife",
      academicDegree: "Bacharelado",
      academicCenter: "CAC",
    },
  });

  const course5 = await prisma.course.create({
    data: {
      name: "Artes Visuais",
      classesTime: "Matutino_Vespertino",
      campus: "Recife",
      academicDegree: "Licenciatura",
      academicCenter: "CAC",
    },
  });

  const courseAccount1 = await prisma.courseAccount.create({
    data: {
      login: "administracao_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.administracao@ufpe.br",
      idCourse: course1.id,
    },
  });
  
  const courseAccount2 = await prisma.courseAccount.create({
    data: {
      login: "arqueologia_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.arqueologia@ufpe.br",
      idCourse: course2.id,
    },
  });
  
  const courseAccount3 = await prisma.courseAccount.create({
    data: {
      login: "arquitetura_e_urbanismo_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.arquiteturaurbanismo@ufpe.br",
      idCourse: course3.id,
    },
  });

  const courseAccount4 = await prisma.courseAccount.create({
    data: {
      login: "artes_visuais_bacharelado_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.artesvisuais@ufpe.br",
      idCourse: course4.id,
    },
  });

  const courseAccount5 = await prisma.courseAccount.create({
    data: {
      login: "artes_visuais_licenciatura_recife",
      password: await bcrypt.hash("12345", 10),
      email: "coord.artesvisuais@ufpe.br",
      idCourse: course5.id,
    },
  });

  const academicPeriod1 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2023.2",
      activePeriod: false,
    },
  });
  
  const academicPeriod2 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2024.1",
      activePeriod: true,
    },
  });

  const academicPeriod3 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2024.2",
      activePeriod: false,
    },
  });

  const academicPeriod4 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2025.1",
      activePeriod: false,
    },
  });

  const academicPeriod5 = await prisma.academicPeriod.create({
    data: {
      idAdministratorAccount: administratorAccount1.id,
      label: "2025.2",
      activePeriod: false,
    },
  });

  const placesOffer1 = await prisma.placesOffer.create({
    data: {
      idCourse: course1.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "InternalCourseTransfer",
      morning: 10,
      morningAfternoon: 10,
      afternoon: 15,
      afternoonNight: 15,
      night: 5,
    },
  });

  const placesOffer2 = await prisma.placesOffer.create({
    data: {
      idCourse: course1.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "InternalClassTimeTransfer",
      morning: 5,
      morningAfternoon: 5,
      afternoon: 10,
      afternoonNight: 10,
      night: 10,
    },
  });

  const placesOffer3 = await prisma.placesOffer.create({
    data: {
      idCourse: course1.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "DiplomaBearer",
      morning: 10,
      morningAfternoon: 5,
      afternoon: 5,
      afternoonNight: 10,
      night: 10,
    },
  });

  const placesOffer4 = await prisma.placesOffer.create({
    data: {
      idCourse: course2.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "InternalCourseTransfer",
      morning: 10,
      morningAfternoon: 10,
      afternoon: 15,
      afternoonNight: 15,
      night: 5,
    },
  });

  const placesOffer5 = await prisma.placesOffer.create({
    data: {
      idCourse: course2.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "InternalClassTimeTransfer",
      morning: 15,
      morningAfternoon: 15,
      afternoon: 10,
      afternoonNight: 10,
      night: 10,
    },
  });

  const placesOffer6 = await prisma.placesOffer.create({
    data: {
      idCourse: course2.id,
      idAcademicPeriod: academicPeriod2.id,
      entryModality: "DiplomaBearer",
      morning: 10,
      morningAfternoon: 5,
      afternoon: 5,
      afternoonNight: 10,
      night: 10,
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