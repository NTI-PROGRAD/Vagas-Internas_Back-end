import { PrismaClient, academicDegree, Campus, AcademicCenters, EntryModality, } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";

const prisma = new PrismaClient();

function generateRandomNumber(minimum: number, maximum: number): number
{
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

async function getCourseIdByCourseName(courseName: string): Promise<string>
{
  const course = await prisma.course.findFirst({ where: { name: courseName, }, });
  return (course) ? course.id : "";
}

async function getFirstAdministratorAccount(): Promise<string>
{
  const administratorsAccounts = await prisma.administratorAccount.findMany({});
  return administratorsAccounts[0].id;
}

async function insertAdministratorsAccountsFromJson()
{
  type AdministratorAccount = {
    login: string,
    password: string,
    email: string
  };

  const administratorsAccounts: Array<AdministratorAccount> = JSON.parse(fs.readFileSync("prisma/administratorsAccounts.json", { encoding: "utf-8", }));

  for (const administratorAccount of administratorsAccounts)
  {
    await prisma.administratorAccount.create({
      data: {
        login: administratorAccount.login,
        password: await bcrypt.hash(administratorAccount.password, 10),
        email: administratorAccount.email,
      },
    });
  }
}

async function insertCoursesAndCoursesAccountsFromJson()
{
  type Course = {
    name: string,
    campus: Campus,
    academicDegree: academicDegree,
    centre: AcademicCenters,
    courseAccount: {
      login: string,
      password: string
    }
  };

  const coursesAccounts: Array<Course> = JSON.parse(fs.readFileSync("prisma/courses.json", { encoding: "utf-8", }));

  for (const course of coursesAccounts)
  {
    const createdCourse = await prisma.course.create({
      data: {
        name: course.name,
        classesTime: "Matutino_Vespertino",
        campus: course.campus,
        academicDegree: course.academicDegree,
        academicCenter: course.centre,
      },
    });

    await prisma.courseAccount.create({
      data: {
        login: course.courseAccount.login,
        password: await bcrypt.hash(course.courseAccount.password, 10),
        email: "",
        idCourse: createdCourse.id,
      },
    });
  }
}

async function insertAcademicPeriodsFromJson(idAdministratorAccount: string): Promise<void>
{
  type academicPeriod = {
    label: string,
    activePeriod: boolean
  };

  const academicPeriods: Array<academicPeriod> = JSON.parse(fs.readFileSync("prisma/academicPeriods.json", { encoding: "utf-8", }));

  for (const academicPeriod of academicPeriods)
  {
    await prisma.academicPeriod.create({
      data: {
        idAdministratorAccount,
        label: academicPeriod.label,
        activePeriod: academicPeriod.activePeriod,
      },
    });
  }
}

async function generatePlacesOffersFromJson(): Promise<void>
{
  type CourseInfo = {
    name: string,
    campus: Campus,
    academicDegree: academicDegree,
    centre: AcademicCenters,
  };

  const entryModalities = [
    "InternalCourseTransfer",
    "InternalClassTimeTransfer",
    "ExternalTransfer",
    "DiplomaBearer",
  ];
  const coursesInfo: Array<CourseInfo> = JSON.parse(fs.readFileSync("prisma/placesOffers.json", { encoding: "utf-8", }));
  
  for (const courseInfo of coursesInfo)
  {
    const course = await prisma.course.findFirst({
      where: {
        name: courseInfo.name,
        campus: courseInfo.campus,
        academicDegree: courseInfo.academicDegree,
      },
    });

    const activeAcademicPeriod = await prisma.academicPeriod.findFirst({
      where: {
        activePeriod: true,
      },
    });

    const morning          = generateRandomNumber(0, 5);
    const morningAfternoon = generateRandomNumber(0, 5);
    const afternoon        = generateRandomNumber(0, 5);
    const afternoonNight   = generateRandomNumber(0, 5);
    const night            = generateRandomNumber(0, 5);

    if (course && activeAcademicPeriod)
    {
      await prisma.placesOffer.create({
        data: {
          idCourse: course?.id,
          idAcademicPeriod: activeAcademicPeriod?.id,
          morning,
          morningAfternoon,
          afternoon,
          afternoonNight,
          night,
          entryModality: entryModalities[generateRandomNumber(0, 3)] as EntryModality,
        },
      });
    }
  }
}

async function main()
{
  // Apaga registros do banco de dados
  await prisma.placesOffer.deleteMany({});
  await prisma.courseAccountGetGrantedTime.deleteMany({});
  await prisma.grantedTime.deleteMany({});
  await prisma.courseAccount.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.academicPeriod.deleteMany({});
  await prisma.administratorAccount.deleteMany({});

  // Semeia banco de dados
  await insertAdministratorsAccountsFromJson();
  await insertCoursesAndCoursesAccountsFromJson();
  const firstAdministratorAccountId = await getFirstAdministratorAccount();
  await insertAcademicPeriodsFromJson(firstAdministratorAccountId);
  await generatePlacesOffersFromJson();
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