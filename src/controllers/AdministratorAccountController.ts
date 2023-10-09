import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";

export class AdministratorAccountController
{
  constructor()
  {
    this.read    = this.read.bind(this);
    this.update  = this.update.bind(this);
    this.readAll = this.readAll.bind(this);
  }

  public async read(request: Request, response: Response)
  {
    const { idAdministratorAccount, } = request.params;

    const administratorAccount = await prismaClient.administratorAccount.findFirst({
      where: {
        id: idAdministratorAccount,
      },
    });

    return response.status(200).json({ administratorAccount, });
  }

  public async update(request: Request, response: Response)
  {}

  public async readAll(request: Request, response: Response)
  {}
}