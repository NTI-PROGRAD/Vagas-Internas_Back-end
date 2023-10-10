import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { IUpdateCoordinationRequest, } from "../interfaces/IUpdateCoordinator";

export class CourseAccountController
{
  constructor()
  {
    this.read = this.read.bind(this);
    this.update = this.update.bind(this);
    this.readAll = this.readAll.bind(this);
  }

  public async read(request: Request, response: Response)
  {
    const { id_coordenacao, } = request.params;

    const courseAccount = await prismaClient.courseAccount.findFirst({
      where: { id: id_coordenacao, },
      select: {
        id: true,
        login: true,
        email: true,
        phoneContact: true,
        idCourse: true,
      },
    });

    return response.status(200).json({ courseAccount, });
  }

  public async update(request: IUpdateCoordinationRequest, response: Response)
  {
    const { idCourseAccount, }        = request.params;
    const { ...courseAccountPayload } = request.body;

    const updatedCourseAccount = await prismaClient.courseAccount.update({
      where: { id: idCourseAccount, },
      data: { ...courseAccountPayload, },
      select: {
        id: true,
        login: true,
        email: true,
        phoneContact: true,
        idCourse: true,
      },
    });    

    return response.status(200).json({ updatedCourseAccount, });
  }

  public async readAll(request: Request, response: Response)
  {
    const coursesAccounts = await prismaClient.courseAccount.findMany({
      select: {
        id: true,
        login: true,
        email: true,
        phoneContact: true,
        idCourse: true,
      },
      orderBy: { login: "asc", },
    });

    return response.status(200).json({ coursesAccounts, });
  }
}