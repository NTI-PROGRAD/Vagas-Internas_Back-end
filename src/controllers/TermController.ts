import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";

interface ICreateTermBodyRequest
{
  inicioDoPrazo: string;
  fimDoPrazo: string;
  idCoordenacoes: Array<string>;
}

interface ICreateTermRequest extends Request
{
  body: ICreateTermBodyRequest;
}

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
}