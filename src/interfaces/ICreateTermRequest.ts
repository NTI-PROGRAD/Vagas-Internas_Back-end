import { Request, } from "express";

interface ICreateTermBodyRequest
{
  inicioDoPrazo: string;
  fimDoPrazo: string;
  idCoordenacoes: Array<string>;
}

export interface ICreateTermRequest extends Request
{
  body: ICreateTermBodyRequest;
}