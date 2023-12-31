import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { $Enums, } from "@prisma/client";
import { DocumentGeneratorUtil, } from "../util/DocumentGeneratorUtil";
import { DocxTableData, } from "../types/GenerateDocxTableData";

export class DocumentGenerator
{
  constructor()
  {
    this.generateDocx = this.generateDocx.bind(this);
  }

  public async generateDocx(request: Request, response: Response)
  {
    const entryModality    = request.query["entry-modality"] as $Enums.EntryModality;
    const academicPeriodId = request.query["academic-period-id"] as string;

    const docxTableData = await DocumentGeneratorTransactions.getDocxTableData(entryModality, academicPeriodId);
    const file          = await DocumentGeneratorUtil.generateDocxDocument(docxTableData);

    return response.status(200).download(file);
  }
}

class DocumentGeneratorTransactions
{
  public static async getDocxTableData(entryModality: $Enums.EntryModality, idAcademicPeriod: string): Promise<DocxTableData>
  {
    return await prismaClient.$transaction(async (tx) => {
      const placesOffersWithConstraints = await tx.placesOffer.findMany({
        where: { entryModality, idAcademicPeriod, },
        select: {
          course: {
            select: {
              name: true,
              academicDegree: true,
              campus: true,
            },
          },
          morning: true,
          morningAfternoon: true,
          afternoon: true,
          afternoonNight: true,
          night: true,
        },
      });

      const academicPeriod = await tx.academicPeriod.findFirst({ where: { id: idAcademicPeriod, }, });
      const docxTableData: DocxTableData = {
        academicPeriod: academicPeriod?.label ?? "",
        entryModality,
        placesOffersWithConstraints,
      };

      return docxTableData;
    });
  }
}