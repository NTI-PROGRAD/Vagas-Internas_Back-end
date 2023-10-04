import { Request, } from "express";

interface ICreateAcademicPeriodBodyRequest
{
  label: string;
  activePeriod: boolean;
  diplomaBearer: boolean;
  externalTransfer: boolean;
  internalCourseTransfer: boolean;
  internalClassTimeTransfer: boolean;
}

export interface ICreateAcademicPeriodRequest extends Request
{
  body: ICreateAcademicPeriodBodyRequest;
}