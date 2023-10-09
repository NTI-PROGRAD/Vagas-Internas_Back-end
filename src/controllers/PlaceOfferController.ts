import { Request, Response, } from "express";
import { ICreatePlaceOfferActiveAcademicPeriodRequest, ICreatePlaceOfferRequest, } from "../interfaces/ICreatePlaceOfferRequest";
import { prismaClient, } from "../database/prismaClient";
import { BadRequestError, } from "../helpers/api-errors";

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

  public async createByActiveAcademicPeriod(
    request: ICreatePlaceOfferActiveAcademicPeriodRequest,
    response: Response
  ) {
    
    const { ...placesOffer }   = request.body;
    const activeAcademicPeriod = await prismaClient.academicPeriod.findFirst({ where: { activePeriod: true, }, });

    if (activeAcademicPeriod)
    {
      const createdPlacesOffer = await prismaClient.placesOffer.create({
        data: {
          idAcademicPeriod: activeAcademicPeriod.id,
          ...placesOffer,
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
        message: `As ofertas de vagas para o curso ${createdPlacesOffer.course.name} para o ` +
                 `periodo letivo de ${createdPlacesOffer.academicPeriod.label} foram criadas ` +
                 "com sucesso",
      });  
    }
    else
      throw new BadRequestError("Não foi possível criar nova oferta de vagas!");
  }

  public async readByActiveAcademicPeriod(request: Request, response: Response)
  {}

  public async readByCourseAccount(request: Request, response: Response)
  {}

  public async readByAcademicPeriod(request: Request, response: Response)
  {}

  public async read(request: Request, response: Response)
  {}
}