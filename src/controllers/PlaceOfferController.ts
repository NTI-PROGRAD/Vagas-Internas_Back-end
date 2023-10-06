import { Request, Response, } from "express";
import { ICreatePlaceOfferRequest, } from "../interfaces/ICreatePlaceOfferRequest";
import { prismaClient, } from "../database/prismaClient";

export class PlaceOfferController
{
  constructor()
  {
    this.create = this.create.bind(this);
  }

  public async create(request: ICreatePlaceOfferRequest, response: Response)
  {
    const {
      idCourse,
      idAcademicPeriod,
      morningClasses,
      afternoonClasses,
      nightClasses,
      fullTimeClasses,
    } = request.body;

    const placesOffer = await prismaClient.placesOffer.create({
      data: {
        idCourse,
        idAcademicPeriod,
        morningClasses,
        afternoonClasses,
        nightClasses,
        fullTimeClasses,
      },
      select: {
        idCourse: true,
        idAcademicPeriod: true,
        morningClasses: true,
        afternoonClasses: true,
        nightClasses: true,
        fullTimeClasses: true,
        course: {
          select: {
            name: true,
          },
        },
        academicPeriod: {
          select: {
            label: true,
          },
        },
      },
    });

    return response.status(201).json({
      message: `As ofertas de vagas para o curso ${placesOffer.course.name} para o ` +
               `periodo letivo de ${placesOffer.academicPeriod.label} foram criadas ` +
               "com sucesso!",
    });
  }
}