import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { ICreateTermRequest, } from "../interfaces/ICreateTermRequest";

export class TermController
{
  public create = async (request: ICreateTermRequest, response: Response) => {
    const { id: idAdministrador, } = request.user;
    const { inicioDoPrazo, fimDoPrazo, idCoordenacoes, } = request.body;

    if (idAdministrador)
    {
      const prazo = await prismaClient.prazo.create({
        data: {
          id_administrador: idAdministrador,
          inicio_do_prazo: new Date(inicioDoPrazo),
          fim_do_prazo: new Date(fimDoPrazo),
        },
      });

      for (const id of idCoordenacoes)
      {
        await prismaClient.coordenacaoObtemPrazo.create({
          data: {
            id_coordenacao: id,
            id_prazo: prazo.id,
            momento_da_concessao: new Date(),
          },
        });
      }

      return response.status(201).json({ message: "Prazo criado com sucesso!", });
    }
  };

  public delete = async (request: Request, response: Response) => {
    const { id_prazo, } = request.params;

    await prismaClient.coordenacaoObtemPrazo.deleteMany({ where: { id_prazo, }, });
    await prismaClient.prazo.delete({ where: { id: id_prazo, }, });

    return response.status(200).json({ message: "Prazo deletado com sucesso!", });
  };

  public read = async (request: Request, response: Response) => {
    const { id_coordenacao, } = request.params;

    const prazos = await prismaClient.coordenacaoObtemPrazo.findMany({
      where: {
        id_coordenacao,
      },
      select: {
        id_prazo: true,
        momento_da_concessao: true,
        prazo: {
          select: {
            inicio_do_prazo: true,
            fim_do_prazo: true,
          },
        },
      },
    });

    return response.status(200).json({ prazos, });
  };

  public readAll = async (request: Request, response: Response) => {
    const prazos = await prismaClient.coordenacaoObtemPrazo.findMany({
      select: {
        coordenacao: {
          select: {
            id: true,
            login: true,
          },
        },
        prazo: {
          select: {
            id: true,
            inicio_do_prazo: true,
            fim_do_prazo: true,
          },
        },
        momento_da_concessao: true,
      },
      orderBy: {
        coordenacao: {
          login: "asc",
        },
      },
    });

    return response.status(200).json({ prazos, });
  };
}