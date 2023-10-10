import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { BadRequestError, UnauthorizedError, } from "../helpers/api-errors";
import { ICreateAcademicPeriodRequest, } from "../interfaces/ICreateAcademicPeriodRequest";
import { AcademicPeriod, } from "@prisma/client";

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
    const { ...academicPeriodPayload } = request.body;

    if (idAdministratorAccount)
    {
      const newAcademicPeriod = await AcademicPeriodTransactions.createAcademicPeriod({
        ...academicPeriodPayload,
        idAdministratorAccount,
        activePeriod: false,
      });

      return response.status(200).json({ newAcademicPeriod, });
    }
    else
      throw new BadRequestError("Não foi possível criar um novo periodo letivo!");
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

class AcademicPeriodTransactions
{
  public static async createAcademicPeriod(academicPeriod: Omit<AcademicPeriod, "id">)
  {
    return await prismaClient.$transaction(async (tx) => {
      const newAcademicPeriod = tx.academicPeriod.create({
        data: { ...academicPeriod, },
      });

      return newAcademicPeriod;
    });
  }
}