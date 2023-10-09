import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { UnauthorizedError, } from "../helpers/api-errors";
import { ICreateAcademicPeriodRequest, } from "../interfaces/ICreateAcademicPeriodRequest";

export class AcademicPeriodController
{
  constructor()
  {
    this.create = this.create.bind(this);
    this.readAll = this.readAll.bind(this);
    this.setActiveAcademicPeriod = this.setActiveAcademicPeriod.bind(this);
    this.readByLabel = this.readByLabel.bind(this);
  }

  public async create(request: ICreateAcademicPeriodRequest, response: Response)
  {
    const { id: idAdministratorAccount, } = request.user;
    const {
      label,
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
          activePeriod: false,
          diplomaBearer,
          externalTransfer,
          internalCourseTransfer,
          internalClassTimeTransfer,
        },
      });

      return response.status(201).json({ message: `Período acadêmico ${academicPeriod.label} criado com sucesso!`, });
    }

    throw new UnauthorizedError("Erro ao cadastrar novo período acadêmico, usuário não autorizado!");
  }

  public async readAll(request: Request, response: Response)
  {
    const academicPeriods = await prismaClient.academicPeriod.findMany({});
    return response.status(200).json({ academicPeriods, });
  }

  public async setActiveAcademicPeriod(request: Request, response: Response)
  {
    const { idAcademicPeriod, } = request.params;

    await prismaClient.academicPeriod.updateMany({
      data: { activePeriod: false, },
    });

    const updatedAcademicPeriod = await prismaClient.academicPeriod.update({
      where: { id: idAcademicPeriod, },
      data: { activePeriod: true, },
    });

    return response.status(200).json({ message: `Novo período acadêmico ${updatedAcademicPeriod.label} vigente`, });
  }

  public async readByLabel(request: Request, response: Response)
  {
    const { label, } = request.params;

    const academicPeriod = await prismaClient.academicPeriod.findFirst({ where: { label, }, });

    return response.status(200).json({ academicPeriod, });
  }
}