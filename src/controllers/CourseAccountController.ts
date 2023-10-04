import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { IUpdateCoordinationRequest, } from "../interfaces/IUpdateCoordinator";

export class CourseAccountController
{
  public read = async (request: Request, response: Response) => {
    const { id_coordenacao, } = request.params;

    const coordinationUser = await prismaClient.courseAccount.findFirst({ where: { id: id_coordenacao, }, });

    return response.status(200).json({ coordinationUser, });
  };

  public update = async (request: IUpdateCoordinationRequest, response: Response) => {
    const { idCourseAccount, } = request.params;
    const { email, phoneContact, } = request.body;

    let coordinationUser;

    if (email !== null)
    {
      coordinationUser = await prismaClient.courseAccount.update({
        where: {
          id: idCourseAccount,
        },
        data: {
          email,
        },
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
      coordinationUser = await prismaClient.courseAccount.update({
        where: {
          id: idCourseAccount,
        },
        data: {
          phoneContact,
        },
        select: {
          id: true,
          login: true,
          email: true,
          phoneContact: true,
        },
      });
    }

    return response.status(200).json({ coordinationUser, });
  };

  public readAll = async (request: Request, response: Response) => {
    const coordinations = await prismaClient.courseAccount.findMany({
      orderBy: {
        login: "asc",
      },
    });

    return response.status(200).json({ coordinations, });
  };
}