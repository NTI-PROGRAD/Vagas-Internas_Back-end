import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";

interface IUpdateCoordinationBodyRequest
{
  email?: string;
  telefone?: string;
}

interface IUpdateCoordinationRequest extends Request
{
  body: IUpdateCoordinationBodyRequest;
}

export class CoordinationController
{
  public read = async (request: Request, response: Response) => {
    const { id_coordenacao, } = request.params;

    const coordinationUser = await prismaClient.coordenacao.findFirst({ where: { id: id_coordenacao, }, });

    return response.status(200).json({ coordinationUser, });
  };

  public update = async (request: IUpdateCoordinationRequest, response: Response) => {
    const { id_coordenacao, } = request.params;
    const { email, telefone, } = request.body;

    let coordinationUser;

    if (email !== null)
    {
      coordinationUser = await prismaClient.coordenacao.update({
        where: {
          id: id_coordenacao,
        },
        data: {
          email,
        },
        select: {
          id: true,
          login: true,
          email: true,
          telefone: true,
        },
      });
    }

    if (telefone !== null)
    {
      coordinationUser = await prismaClient.coordenacao.update({
        where: {
          id: id_coordenacao,
        },
        data: {
          telefone,
        },
        select: {
          id: true,
          login: true,
          email: true,
          telefone: true,
        },
      });
    }

    return response.status(200).json({ coordinationUser, });
  };
}