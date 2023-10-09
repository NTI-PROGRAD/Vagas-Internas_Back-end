import { Request, } from "express";

interface IPlaceOfferBodyRequest
{
  idCourse: string;
  idAcademicPeriod: string;
  morningClasses: number;
  afternoonClasses: number;
  nightClasses: number;
  fullTimeClasses: number;
}

interface IPlaceOfferActiveAcademicPeriodBodyRequest
  extends Omit<IPlaceOfferBodyRequest, "idAcademicPeriod">
{}

export interface ICreatePlaceOfferRequest
 extends Request
{
  body: IPlaceOfferBodyRequest;
}

export interface ICreatePlaceOfferActiveAcademicPeriodRequest
 extends Request
{
  body: IPlaceOfferActiveAcademicPeriodBodyRequest;
}