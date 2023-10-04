import { Request, } from "express";

interface IAuthLoginBodyRequest
{
  login: string;
  password: string;
}

export interface IAuthLoginRequest extends Request
{
  body: IAuthLoginBodyRequest;
}