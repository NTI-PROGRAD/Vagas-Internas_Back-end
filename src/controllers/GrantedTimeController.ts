import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { ICreateTermRequest, } from "../interfaces/ICreateTermRequest";

export class GrantedTimeController
{
  public create = async (request: ICreateTermRequest, response: Response) => {
    const { id: idAdministratorAccount, } = request.user;
    const { startTime, endTime, idCoursesAccounts, } = request.body;

    if (idAdministratorAccount)
    {
      const grantedTime = await prismaClient.grantedTime.create({
        data: {
          idAdministratorAccount,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      for (const id of idCoursesAccounts)
      {
        await prismaClient.courseAccountGetGrantedTime.create({
          data: {
            idCourseAccount: id,
            idGrantedTime: grantedTime.id,
            grantDatetime: new Date(),
          },
        });
      }

      return response.status(201).json({ message: "Prazo criado com sucesso!", });
    }
  };

  public read = async (request: Request, response: Response) => {
    const { idCourseAccount, } = request.params;

    const grantedTimes = await prismaClient.courseAccountGetGrantedTime.findMany({
      where: {
        idCourseAccount,
      },
      select: {
        idGrantedTime: true,
        grantDatetime: true,
        grantedTime: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    return response.status(200).json({ grantedTimes, });
  };

  public delete = async (request: Request, response: Response) => {
    const { idGrantedTime, } = request.params;

    await prismaClient.courseAccountGetGrantedTime.deleteMany({ where: { idGrantedTime, }, });
    await prismaClient.grantedTime.delete({ where: { id: idGrantedTime, }, });

    return response.status(200).json({ message: "Prazo deletado com sucesso!", });
  };

  public readAll = async (request: Request, response: Response) => {
    const grantedTimes = await prismaClient.courseAccountGetGrantedTime.findMany({
      select: {
        courseAccount: {
          select: {
            id: true,
            login: true,
          },
        },
        grantedTime: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
          },
        },
        grantDatetime: true,
      },
      orderBy: {
        courseAccount: {
          login: "asc",
        },
      },
    });

    return response.status(200).json({ grantedTimes, });
  };
}