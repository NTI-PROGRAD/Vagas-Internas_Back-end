import { Response, } from "express";
import { AdministratorAccount, CourseAccount, } from "@prisma/client";
import { compare, } from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, } from "../helpers/api-errors";
import { IAuthLoginRequest, } from "../interfaces/IAuthLoginRequest";

export class AuthController
{
  constructor()
  {
    this.login = this.login.bind(this);
    this.getAdministratorAccount = this.getAdministratorAccount.bind(this);
    this.getCourseAccount = this.getCourseAccount.bind(this);
    this.validAdministratorAccountAuthentication = this.validAdministratorAccountAuthentication.bind(this);
    this.validCourseAccountAuthentication = this.validCourseAccountAuthentication.bind(this);
    this.matchPassword = this.matchPassword.bind(this);
  }

  public async login(request: IAuthLoginRequest, response: Response)
  {
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
  }

  private async getAdministratorAccount(login: string): Promise<AdministratorAccount | null>
  {
    return await prismaClient.administratorAccount.findFirst({ where: { login, }, });
  }

  private async getCourseAccount(login: string): Promise<CourseAccount | null>
  {
    return await prismaClient.courseAccount.findFirst({ where: { login, }, });
  }

  private async validAdministratorAccountAuthentication(password: string, administratorUser: AdministratorAccount | null): Promise<boolean>
  {
    if (administratorUser === null) return false;
    
    return await this.matchPassword(password, administratorUser.password);
  }

  private async validCourseAccountAuthentication(password: string, coordinatorUser: CourseAccount | null): Promise<boolean>
  {
    if (coordinatorUser === null) return false;

    return await this.matchPassword(password, coordinatorUser.password);
  }

  private async matchPassword(password: string, encryptedPassword: string): Promise<boolean>
  {
    return await compare(password, encryptedPassword);
  }
}