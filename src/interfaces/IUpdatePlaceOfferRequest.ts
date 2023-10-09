import { Request, } from "express";

interface IPlaceOfferBodyRequest
{
  idCourse: string;
  idAcademicPeriod: string;
  morningClasses?: number;
  afternoonClasses?: number;
  nightClasses?: number;
  fullTimeClasses?: number;
}

export interface IUpdatePlaceOfferRequest
  extends Request
{
  body: IPlaceOfferBodyRequest;
}

export interface IUpdatePlaceOfferActiveAcademicPeriodRequest
  extends Request
{
  body: Omit<IPlaceOfferBodyRequest, "idAcademicPeriod">
}