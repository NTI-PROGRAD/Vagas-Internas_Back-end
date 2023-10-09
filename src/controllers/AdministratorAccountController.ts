import { Request, Response, } from "express";

export class AdministratorAccountController
{
  constructor()
  {
    this.read    = this.read.bind(this);
    this.update  = this.update.bind(this);
    this.readAll = this.readAll.bind(this);
  }

  public async read(request: Request, response: Response)
  {}

  public async update(request: Request, response: Response)
  {}

  public async readAll(request: Request, response: Response)
  {}
}