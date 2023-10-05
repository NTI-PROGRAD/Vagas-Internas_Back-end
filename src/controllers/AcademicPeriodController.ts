import { Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { UnauthorizedError, } from "../helpers/api-errors";
import { ICreateAcademicPeriodRequest, } from "../interfaces/ICreateAcademicPeriodRequest";

export class AcademicPeriodController
{
  constructor()
  {
    this.create = this.create.bind(this);
  }

  public async create(request: ICreateAcademicPeriodRequest, response: Response)
  {
    const { id: idAdministratorAccount, } = request.user;
    const {
      label,
      activePeriod,
      diplomaBearer,
      externalTransfer,
      internalCourseTransfer,
      internalClassTimeTransfer,
    } = request.body;

    if (idAdministratorAccount)
    {
      const academicPeriod = await prismaClient.academicPeriod.create({
        data: {
          idAdministratorAccount,
          label,
          activePeriod,
          diplomaBearer,
          externalTransfer,
          internalCourseTransfer,
          internalClassTimeTransfer,
        },
      });

      return response.status(201).json({ message: "Período acadêmico criado com sucesso!", });
    }

    throw new UnauthorizedError("Erro ao cadastrar novo período acadêmico, usuário não autorizado!");
  }
}