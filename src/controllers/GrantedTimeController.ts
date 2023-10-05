import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { ICreateTermRequest, } from "../interfaces/ICreateTermRequest";

export class GrantedTimeController
{
  constructor()
  {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.delete = this.delete.bind(this);
    this.readAll = this.readAll.bind(this);
    this.readGrantedTimesByCourseAccount = this.readGrantedTimesByCourseAccount.bind(this);
  }

  public async create(request: ICreateTermRequest, response: Response)
  {
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
  }

  public async delete(request: Request, response: Response)
  {
    const { idGrantedTime, } = request.params;

    await prismaClient.courseAccountGetGrantedTime.deleteMany({ where: { idGrantedTime, }, });
    await prismaClient.grantedTime.delete({ where: { id: idGrantedTime, }, });

    return response.status(200).json({ message: "Prazo deletado com sucesso!", });
  }

  public async read(request: Request, response: Response)
  {
    const { idGrantedTime, } = request.params;

    const grantedTime = await prismaClient.grantedTime.findFirst({
      where: { id: idGrantedTime, },
    });

    return response.status(200).json({ grantedTime, });
  }

  public async readAll(request: Request, response: Response)
  {
    const grantedTimes = await prismaClient.grantedTime.findMany({
      select: {
        id: true,
        idAdministratorAccount: true,
        startTime: true,
        endTime: true,
        coursesAccountsGetGrantedTimes: {
          select: {
            courseAccount: {
              select: {
                id: true,
                login: true,
              },
            },
          },
        },
      },
    });

    const grantedTimesResponse = grantedTimes.map((response) => ({
      id: response.id,
      idAdministratorAccount: response.idAdministratorAccount,
      startTime: response.startTime,
      endTime: response.endTime,
      idTargetCourseAccounts: response.coursesAccountsGetGrantedTimes.map((item) => item.courseAccount.id),
    }));

    return response.status(200).json({ grantedTimesResponse, });
  }

  public async readGrantedTimesByCourseAccount(request: Request, response: Response)
  {
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
  }
}