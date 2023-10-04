import { Request, Response, } from "express";
import type { AdministratorAccount, CourseAccount, } from "@prisma/client";
import { compare, } from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, } from "../helpers/api-errors";

export class AuthController
{
  public login = async (request: Request, response: Response) => {
    const { login, password, } = request.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const administratorUser = await this.getAdministratorAccount(login);
    const coordinatorUser   = await this.getCourseAccount(login);

    if (await this.validAdministratorAccountAuthentication(password, administratorUser))
    {
      const token = jwt.sign({ userId: administratorUser?.id, }, jwtSecretKey, {});
      return response.json({ token, });
    }

    if (await this.validCourseAccountAuthentication(password, coordinatorUser))
    {
      const token = jwt.sign({ userId: coordinatorUser?.id, }, jwtSecretKey, {});
      return response.json({ token, });
    }

    throw new NotFoundError("Usuário ou senha incorretos!");
  };

  private getAdministratorAccount = async (login: string): Promise<AdministratorAccount | null> => {
    return await prismaClient.administratorAccount.findFirst({ where: { login, }, });
  };

  private getCourseAccount = async (login: string): Promise<CourseAccount | null> => {
    return await prismaClient.courseAccount.findFirst({ where: { login, }, });
  };

  private matchPassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(password, encryptedPassword);
  };

  private validAdministratorAccountAuthentication = async (password: string, administratorUser: AdministratorAccount | null): Promise<boolean> => {
    if (administratorUser === null) return false;
    
    return await this.matchPassword(password, administratorUser.password);
  };

  private validCourseAccountAuthentication = async (password: string, coordinatorUser: CourseAccount | null): Promise<boolean> => {
    if (coordinatorUser === null) return false;

    return await this.matchPassword(password, coordinatorUser.password);
  };
}