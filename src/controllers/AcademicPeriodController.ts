import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { BadRequestError, } from "../helpers/api-errors";
import { AcademicPeriod, } from "@prisma/client";
import { AcademicPeriodUtil, } from "../util/AcademicPeriodUtil";
import { ICreateAcademicPeriodRequest, } from "../interfaces/ICreateAcademicPeriodRequest";

export class AcademicPeriodController
{
  constructor()
  {
    this.createNextAcademicPeriod = this.createNextAcademicPeriod.bind(this);
    this.readAll = this.readAll.bind(this);
    this.setActiveAcademicPeriod = this.setActiveAcademicPeriod.bind(this);
    this.readByLabel = this.readByLabel.bind(this);
    this.readActiveAcademicPeriod = this.readActiveAcademicPeriod.bind(this);
  }

  public async create(request: ICreateAcademicPeriodRequest, response: Response)
  {
    const { id: idAdministratorAccount, } = request.user;
    const { label, } = request.body;

    if (idAdministratorAccount)
    {
      const createdAcademicPeriod = await AcademicPeriodTransactions.create(idAdministratorAccount, label);
      return response.status(200).json({ createdAcademicPeriod, });
    }
    else
      throw new BadRequestError("Não foi possível criar um novo periodo letivo!");
  }

  public async createNextAcademicPeriod(request: Request, response: Response)
  {
    const { id: idAdministratorAccount, } = request.user;

    if (idAdministratorAccount)
    {
      const nextAcademicPeriod = await AcademicPeriodTransactions.createNextAcademicPeriod(idAdministratorAccount);
      return response.status(200).json({ nextAcademicPeriod, });
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

    const updatedAcademicPeriod = await AcademicPeriodTransactions.setActiveAcademicPeriod(idAcademicPeriod);

    return response.status(200).json({ message: `Novo período acadêmico ${updatedAcademicPeriod.label} vigente`, });
  }

  public async readByLabel(request: Request, response: Response)
  {
    const { label, } = request.params;

    const academicPeriod = await prismaClient.academicPeriod.findFirst({ where: { label, }, });

    return response.status(200).json({ academicPeriod, });
  }

  public async readActiveAcademicPeriod(request: Request, response: Response)
  {
    const activeAcademicPeriod = await prismaClient.academicPeriod.findFirst({
      where: { activePeriod: true, },
    });

    return response.status(200).json({ activeAcademicPeriod, });
  }
}

class AcademicPeriodTransactions
{
  public static async setActiveAcademicPeriod(idAcademicPeriod: string): Promise<AcademicPeriod>
  {
    return await prismaClient.$transaction(async (tx) => {
      await tx.academicPeriod.updateMany({
        data: { activePeriod: false, },
      });

      const updatedAcademicPeriod = await tx.academicPeriod.update({
        where: { id: idAcademicPeriod, },
        data: { activePeriod: true, },
      });

      return updatedAcademicPeriod;
    });
  }

  public static async createNextAcademicPeriod(idAdministratorAccount: string): Promise<AcademicPeriod>
  {
    return await prismaClient.$transaction(async (tx) => {
      const academicPeriodsLabels = await tx.academicPeriod.findMany({ select: { label: true, }, });
      const nextAcademicPeriodLabel = AcademicPeriodUtil.getNextAcademicPeriodFromDatabaseQueryArray(academicPeriodsLabels);
      const nextAcademicPeriod = await tx.academicPeriod.create({
        data: {
          idAdministratorAccount,
          activePeriod: false,
          label: nextAcademicPeriodLabel,
        },
      });

      return nextAcademicPeriod;
    });
  }

  public static async create(idAdministratorAccount: string, label: string): Promise<AcademicPeriod>
  {
    return await prismaClient.$transaction(async (tx) => {
      const createdAcademicPeriod = await tx.academicPeriod.create({
        data: {
          idAdministratorAccount,
          activePeriod: false,
          label,
        },
      });

      return createdAcademicPeriod;
    });
  }
}