import { Request, } from "express";

interface IUpdateCoordinationBodyRequest
{
  email?: string;
  phoneContact?: string;
}

export interface IUpdateCoordinationRequest extends Request
{
  body: IUpdateCoordinationBodyRequest;
}