import { Request, } from "express";

interface IUpdateCoordinationBodyRequest
{
  email?: string;
  telefone?: string;
}

export interface IUpdateCoordinationRequest extends Request
{
  body: IUpdateCoordinationBodyRequest;
}