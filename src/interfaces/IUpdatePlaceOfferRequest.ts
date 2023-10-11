import { Request, } from "express";
import { PlacesOffer, } from "@prisma/client";

interface IUpdatePlacesOfferPayload
  extends PlacesOffer
{}

export interface IUpdatePlacesOfferRequest
  extends Request
{
  body: IUpdatePlacesOfferPayload;
}

export interface IUpdatePlacesOfferActiveAcademicPeriodRequest
  extends Request
{
  body: Omit<IUpdatePlacesOfferPayload, "idAcademicPeriod">
}