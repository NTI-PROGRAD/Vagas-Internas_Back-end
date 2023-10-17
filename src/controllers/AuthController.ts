import { Request, Response, } from "express";
import { AdministratorAccount, CourseAccount, } from "@prisma/client";
import { compare, } from "bcrypt";
import jwt, { UserIdJwtPayload, JsonWebTokenError, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";
import { IAuthLoginRequest, } from "../interfaces/IAuthLoginRequest";
import { AdministratorAccountRepository, } from "../repositories/AdministratorAccountRepositoty";
import { CourseAccountRepository, } from "../repositories/CourseAccount.repository";

export class AuthController
{
  constructor()
  {
    this.login = this.login.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

    this.getAdministratorAccount = this.getAdministratorAccount.bind(this);
    this.getCourseAccount = this.getCourseAccount.bind(this);
    this.validAdministratorAccountAuthentication = this.validAdministratorAccountAuthentication.bind(this);
    this.validCourseAccountAuthentication = this.validCourseAccountAuthentication.bind(this);
    this.matchPassword = this.matchPassword.bind(this);
    this.hasGrantedTime = this.hasGrantedTime.bind(this);
    this.isWithinDeadline = this.isWithinDeadline.bind(this);
  }

  public async login(request: IAuthLoginRequest, response: Response)
  {
    const { login, password, } = request.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const administratorUser = await this.getAdministratorAccount(login);
    const courseAccount     = await this.getCourseAccount(login);

    if (await this.validAdministratorAccountAuthentication(password, administratorUser))
    {
      const token = jwt.sign({ userId: administratorUser?.id, }, jwtSecretKey, {});
      return response.json({ token, });
    }

    if (await this.validCourseAccountAuthentication(password, courseAccount))
    {
      const token = jwt.sign({ userId: courseAccount?.id, }, jwtSecretKey, {});
      return response.json({ token, });
    }

    throw new NotFoundError("Usuário ou senha incorretos!");
  }

  public async isAuthenticated(request: Request, response: Response)
  {
    let authenticated  = false;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    const token        = request.body?.token as string;

    try
    {
      const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);

      if (await AdministratorAccountRepository.findById(userId))
        authenticated = true;

      if (await CourseAccountRepository.findById(userId))
        authenticated = (await CourseAccountRepository.hasGrantedTimeById(userId)) ? true : false;

      if (authenticated) return response.status(200).json({ validAuthentication: true, });
      else               return response.status(404).json({ validAuthentication: false, });
    }
    catch(error)
    {
      return response.status(400).json({ validAuthentication: false, });
    }
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

  private async validCourseAccountAuthentication(password: string, courseAccount: CourseAccount | null): Promise<boolean>
  {
    if (courseAccount === null) return false;
    if (!await this.hasGrantedTime(courseAccount)) return false;

    return await this.matchPassword(password, courseAccount.password);
  }

  private async matchPassword(password: string, encryptedPassword: string): Promise<boolean>
  {
    return await compare(password, encryptedPassword);
  }

  private async hasGrantedTime(courseAccount: CourseAccount): Promise<boolean>
  {
    const courseGrantedTimes = await prismaClient.courseAccountGetGrantedTime.findMany({
      where: { idCourseAccount: courseAccount.id, },
      select: {
        grantDatetime: true,
        grantedTime: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    for (const grantedTime of courseGrantedTimes)
      if (this.isWithinDeadline(grantedTime.grantedTime.endTime))
        return true;

    throw new UnauthorizedError("Esta conta de coordenação não possui acesso no momento!");
  }

  private isWithinDeadline(endTime: Date): boolean
  {
    return (new Date().getTime() <= endTime.getTime());
  }
}