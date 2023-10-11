import { Request, } from "express";
import { PlacesOffer, } from "@prisma/client";

interface IPlacesOfferPayload
  extends PlacesOffer
{}

interface IPlacesOfferActiveAcademicPeriodPayload
  extends Omit<IPlacesOfferPayload, "idAcademicPeriod">
{}

export interface ICreatePlaceOfferRequest
  extends Request
{
  body: IPlacesOfferPayload;
}

export interface ICreatePlaceOfferActiveAcademicPeriodRequest
  extends Request
{
  body: IPlacesOfferActiveAcademicPeriodPayload;
}