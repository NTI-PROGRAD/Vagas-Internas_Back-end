import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { UnauthorizedError, } from "../helpers/api-errors";

interface ICreateAcademicPeriodBodyRequest
{
  rotulo: string;
  periodoAtivo: boolean;
  portadorDeDiploma: boolean;
  transferenciaExterna: boolean;
  transferenciaInternaCurso: boolean;
  transferenciaInternaTurno: boolean;
}

interface ICreateAcademicPeriodRequest extends Request
{
  body: ICreateAcademicPeriodBodyRequest;
}

export class AcademicPeriodController
{
  public create = async (request: ICreateAcademicPeriodRequest, response: Response) => {
    const { id: idAdministrador, } = request.user;
    const {
      rotulo,
      periodoAtivo,
      portadorDeDiploma,
      transferenciaExterna,
      transferenciaInternaCurso,
      transferenciaInternaTurno,
    } = request.body;

    if (idAdministrador)
    {
      const academicPeriod = await prismaClient.periodoAcademico.create({
        data: {
          id_administrador: idAdministrador,
          rotulo: rotulo,
          periodo_ativo: periodoAtivo,
          portador_de_diploma: portadorDeDiploma,
          transferencia_externa: transferenciaExterna,
          transferencia_interna_curso: transferenciaInternaCurso,
          transferencia_interna_turno: transferenciaInternaTurno,
        },
      });

      return response.status(201).json({ message: "Período acadêmico criado com sucesso!", });
    }

    throw new UnauthorizedError("Erro ao cadastrar novo período acadêmico, usuário não autorizado!");
  };
}