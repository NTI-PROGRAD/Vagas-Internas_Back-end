import { Request, } from "express";
import { AcademicPeriod, } from "@prisma/client";

export interface ICreateAcademicPeriodRequest extends Request
{
  body: Omit<
    AcademicPeriod,
    "id" | "idAdministratorAccount" | "activePeriod"
  >;
}