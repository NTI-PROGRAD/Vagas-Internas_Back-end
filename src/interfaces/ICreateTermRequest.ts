import { Request, } from "express";

export interface ICreateTermBodyRequest
{
  startTime: string;
  endTime: string;
  idCoursesAccounts: Array<string>;
}

export interface ICreateTermRequest extends Request
{
  body: ICreateTermBodyRequest;
}