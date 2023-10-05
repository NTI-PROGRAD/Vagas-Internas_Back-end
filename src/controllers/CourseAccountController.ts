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
      },
    });

    return response.status(200).json({ courseAccount, });
  }

  public async update(request: IUpdateCoordinationRequest, response: Response)
  {
    const { idCourseAccount, } = request.params;
    const { email, phoneContact, } = request.body;

    let courseAccount;

    if (email !== null)
    {
      courseAccount = await prismaClient.courseAccount.update({
        where: { id: idCourseAccount, },
        data: { email, },
        select: {
          id: true,
          login: true,
          email: true,
          phoneContact: true,
        },
      });
    }

    if (phoneContact !== null)
    {
      courseAccount = await prismaClient.courseAccount.update({
        where: { id: idCourseAccount, },
        data: { phoneContact, },
        select: {
          id: true,
          login: true,
          email: true,
          phoneContact: true,
        },
      });
    }

    return response.status(200).json({ courseAccount, });
  }

  public async readAll(request: Request, response: Response)
  {
    const coursesAccounts = await prismaClient.courseAccount.findMany({
      select: {
        id: true,
        login: true,
        email: true,
        phoneContact: true,
      },
      orderBy: { login: "asc", },
    });

    return response.status(200).json({ coursesAccounts, });
  }
}