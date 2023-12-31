import { Request, Response, } from "express";
import { ICreatePlaceOfferActiveAcademicPeriodRequest, ICreatePlaceOfferRequest, } from "../interfaces/ICreatePlaceOfferRequest";
import { prismaClient, } from "../database/prismaClient";
import { BadRequestError, } from "../helpers/api-errors";
import { IUpdatePlacesOfferRequest, IUpdatePlacesOfferActiveAcademicPeriodRequest, } from "../interfaces/IUpdatePlaceOfferRequest";

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
    this.update = this.update.bind(this);
    this.updateByActiveAcademicPeriod = this.updateByActiveAcademicPeriod.bind(this);
  }

  public async create(request: ICreatePlaceOfferRequest, response: Response)
  {
    const { ...createPlaceOfferPayload } = request.body;

    const placesOffer = await prismaClient.placesOffer.create({
      data: { ...createPlaceOfferPayload, },
      select: {
        idCourse: true,
        idAcademicPeriod: true,
        entryModality: true,
        morning: true,
        morningAfternoon: true,
        afternoon: true,
        afternoonNight: true,
        night: true,
        course: { select: { name: true, }, },
        academicPeriod: { select: { label: true, }, },
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
    
    const { ...createPlaceOfferPayload }   = request.body;
    const activeAcademicPeriod = await prismaClient.academicPeriod.findFirst({ where: { activePeriod: true, }, });

    if (activeAcademicPeriod)
    {
      const createdPlacesOffer = await prismaClient.placesOffer.create({
        data: {
          idAcademicPeriod: activeAcademicPeriod.id,
          ...createPlaceOfferPayload,
        },
        select: {
          idCourse: true,
          idAcademicPeriod: true,
          morning: true,
          morningAfternoon: true,
          afternoon: true,
          afternoonNight: true,
          night: true,
          course: { select: { name: true, }, },
          academicPeriod: { select: { label: true, }, },
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
  {
    const activeAcademicPeriod = await prismaClient.academicPeriod.findFirst({ where: { activePeriod: true, }, });

    if (activeAcademicPeriod)
    {
      const placesOffer = await prismaClient.placesOffer.findMany({
        where: { idAcademicPeriod: activeAcademicPeriod.id, },
      });

      return response.status(200).json({ placesOffer, });
    }
    else
      throw new BadRequestError("Não foi possível ler ofertas de vagas!");
  }

  public async readByCourseAccount(request: Request, response: Response)
  {
    const { idCourse, } = request.params;

    const placesOffer = await prismaClient.placesOffer.findMany({ where: { idCourse, }, });

    return response.status(200).json({ placesOffer, });
  }

  public async readByAcademicPeriod(request: Request, response: Response)
  {
    const { idAcademicPeriod, } = request.params;

    const placesOffer = await prismaClient.placesOffer.findMany({ where: { idAcademicPeriod, }, });

    return response.status(200).json({ placesOffer, });
  }

  public async read(request: Request, response: Response)
  {
    const { idCourse, idAcademicPeriod, } = request.params;

    const placesOffer = await prismaClient.placesOffer.findFirst({
      where: { idCourse, idAcademicPeriod, },
    });

    return response.status(200).json({ placesOffer, });
  }

  public async update(request: IUpdatePlacesOfferRequest, response: Response)
  {
    const { ...placesOfferPayload } = request.body;

    const updatedPlaceOffer = await prismaClient.placesOffer.update({
      where: {
        idCourse_idAcademicPeriod_entryModality: {
          idCourse: placesOfferPayload.idCourse,
          idAcademicPeriod: placesOfferPayload.idAcademicPeriod,
          entryModality: placesOfferPayload.entryModality,
        },
      },
      data: {
        ...placesOfferPayload,
      },
    });

    return response.status(200).json({ updatedPlaceOffer, });
  }

  public async updateByActiveAcademicPeriod(
    request: IUpdatePlacesOfferActiveAcademicPeriodRequest,
    response: Response
  ) {
    const { ...placesOfferPayload } = request.body;

    const activeAcademicPeriod = await prismaClient.academicPeriod.findFirst({ where: { activePeriod: true, }, });

    if (activeAcademicPeriod)
    {
      const updatedPlaceOffer = await prismaClient.placesOffer.update({
        where: {
          idCourse_idAcademicPeriod_entryModality: {
            idCourse: placesOfferPayload.idCourse,
            idAcademicPeriod: activeAcademicPeriod.id,
            entryModality: placesOfferPayload.entryModality,
          },
        },
        data: { ...placesOfferPayload, },
      });

      return response.status(200).json({ updatedPlaceOffer, });
    }
    else
      throw new BadRequestError("Não foi possível atualizar a oferta de vagas");
  }
}