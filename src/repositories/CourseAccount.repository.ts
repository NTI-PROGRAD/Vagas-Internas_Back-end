import { CourseAccount, } from "@prisma/client";
import { prismaClient, } from "../database/prismaClient";

export class CourseAccountRepository
{
  public static async findById(id: string): Promise<CourseAccount | null>
  {
    return await prismaClient.courseAccount.findFirst({ where: { id, }, });
  }

  public static async findByLogin(id: string): Promise<CourseAccount | null>
  {
    return await prismaClient.courseAccount.findFirst({ where: { id, }, });
  }

  public static async hasGrantedTimeById(id: string): Promise<boolean | null>
  {
    const grantedTimesIds = await prismaClient.courseAccountGetGrantedTime.findMany({
      where:  { idCourseAccount: id, },
      select: { idGrantedTime: true, },
    });

    for (const { idGrantedTime, } of grantedTimesIds)
    {
      const grantedTime = await prismaClient.grantedTime.findFirst({ where: { id: idGrantedTime, }, });
      if (grantedTime && new Date() <= grantedTime.endTime)
        return true;
    }

    return false;
  }
}