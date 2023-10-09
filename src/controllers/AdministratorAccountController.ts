import { Request, Response, } from "express";
import { prismaClient, } from "../database/prismaClient";
import { IUpdateAdministratorAccountRequest, } from "../interfaces/IUpdateAdministratorAccount";

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

  public async update(request: IUpdateAdministratorAccountRequest, response: Response)
  {
    const { idAdministratorAccount, } = request.params;
    const { ...administratorChanges } = request.body;

    const administratorAccount = await prismaClient.administratorAccount.update({
      where: { id: idAdministratorAccount, },
      data: { ...administratorChanges, },
    });

    return response.status(200).json({ administratorAccount, });
  }

  public async readAll(request: Request, response: Response)
  {
    const administratorsAccounts = await prismaClient.administratorAccount.findMany({
      orderBy: { login: "asc", },
    });

    return response.status(200).json({ administratorsAccounts, });
  }
}