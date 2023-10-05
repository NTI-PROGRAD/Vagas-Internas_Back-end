import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { UnauthorizedError, } from "../helpers/api-errors";
import { ICreateAcademicPeriodRequest, } from "../interfaces/ICreateAcademicPeriodRequest";

export class AcademicPeriodController
{
  constructor()
  {
    this.create = this.create.bind(this);
    this.setActiveAcademicPeriod = this.setActiveAcademicPeriod.bind(this);
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

  public async setActiveAcademicPeriod(request: Request, response: Response)
  {
    const { idAcademicPeriod, } = request.params;

    await prismaClient.academicPeriod.updateMany({
      where: {  },
      data: { activePeriod: false, },
    });

    const updatedAcademicPeriod = await prismaClient.academicPeriod.update({
      where: { id: idAcademicPeriod, },
      data: { activePeriod: true, },
    });

    return response.status(200).json({ message: `Novo período acadêmico ${updatedAcademicPeriod.label} vigente`, });
  }
}