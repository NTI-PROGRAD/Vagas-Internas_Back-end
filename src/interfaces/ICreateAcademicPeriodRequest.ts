import { Request, } from "express";

interface ICreateAcademicPeriodBodyRequest
{
  rotulo: string;
  periodoAtivo: boolean;
  portadorDeDiploma: boolean;
  transferenciaExterna: boolean;
  transferenciaInternaCurso: boolean;
  transferenciaInternaTurno: boolean;
}

export interface ICreateAcademicPeriodRequest extends Request
{
  body: ICreateAcademicPeriodBodyRequest;
}