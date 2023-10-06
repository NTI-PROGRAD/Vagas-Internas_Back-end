import { Request, } from "express";

interface ICreatePlaceOfferBodyRequest
{
  idCourse: string;
  idAcademicPeriod: string;
  morningClasses: number;
  afternoonClasses: number;
  nightClasses: number;
  fullTimeClasses: number;
}

export interface ICreatePlaceOfferRequest extends Request
{
  body: ICreatePlaceOfferBodyRequest;
}