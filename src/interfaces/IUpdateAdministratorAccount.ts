import { Request, } from "express";
import { AdministratorAccount, } from "@prisma/client";

export interface IUpdateAdministratorAccountPayload
{
  email?: string;
  phoneContact?: string;
}

export interface IUpdateAdministratorAccountRequest
  extends Request
{
  body: IUpdateAdministratorAccountPayload;
}