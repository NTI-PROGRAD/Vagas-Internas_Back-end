import { Request, } from "express";

interface ICreateTermBodyRequest
{
  startTime: string;
  endTime: string;
  idCoursesAccounts: Array<string>;
}

export interface ICreateTermRequest extends Request
{
  body: ICreateTermBodyRequest;
}