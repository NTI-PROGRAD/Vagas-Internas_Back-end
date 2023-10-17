import { AdministratorAccount, } from "@prisma/client";
import { prismaClient, } from "../database/prismaClient";

export class AdministratorAccountRepository
{
  public static async findById(id: string): Promise<AdministratorAccount | null>
  {
    return await prismaClient.administratorAccount.findFirst({ where: { id, }, });
  }

  public static async findByLogin(login: string): Promise<AdministratorAccount | null>
  {
    return await prismaClient.administratorAccount.findFirst({ where: { login, }, });
  }
}