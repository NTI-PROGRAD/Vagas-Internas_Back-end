import { Request, Response, } from "express";
import { ICreatePlaceOfferRequest, } from "../interfaces/ICreatePlaceOfferRequest";
import { prismaClient, } from "../database/prismaClient";

export class PlaceOfferController
{
  constructor()
  {
    this.create = this.create.bind(this);
    this.createByActiveAcademicPeriod = this.createByActiveAcademicPeriod.bind(this);
    this.readByActiveAcademicPeriod = this.readByActiveAcademicPeriod.bind(this);
    this.readByCourseAccount = this.readByCourseAccount.bind(this);
    this.readByAcademicPeriod = this.readByAcademicPeriod.bind(this);
    this.read = this.read.bind(this);
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

  public async createByActiveAcademicPeriod(request: Request, response: Response)
  {}

  public async readByActiveAcademicPeriod(request: Request, response: Response)
  {}

  public async readByCourseAccount(request: Request, response: Response)
  {}

  public async readByAcademicPeriod(request: Request, response: Response)
  {}

  public async read(request: Request, response: Response)
  {}
}