import { Request, Response, } from "express";
import type { Administrador, Coordenacao, } from "@prisma/client";
import { compare, } from "bcrypt";
import jwt from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, } from "../helpers/api-errors";

export class AuthController
{
  public login = async (request: Request, response: Response) => {
    const { login, senha, } = request.body;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const administratorUser = await this.getAdministratorUser(login);
    const coordinatorUser   = await this.getCoordinatorUser(login);

    if (await this.validAdministratorAuthentication(senha, administratorUser))
    {
      const token = jwt.sign({ userId: administratorUser?.id, }, jwtSecretKey, { expiresIn: 600, });
      return response.json({ token, });
    }

    if (await this.validCoordinatorAuthentication(senha, coordinatorUser))
    {
      const token = jwt.sign({ userId: coordinatorUser?.id, }, jwtSecretKey, { expiresIn: 600, });
      return response.json({ token, });
    }

    throw new NotFoundError("Usuário ou senha incorretos!");
  };

  private getAdministratorUser = async (login: string): Promise<Administrador | null> => {
    return await prismaClient.administrador.findFirst({ where: { login, }, });
  };

  private getCoordinatorUser = async (login: string): Promise<Coordenacao | null> => {
    return await prismaClient.coordenacao.findFirst({ where: { login, }, });
  };

  private matchPassword = async (senha: string, encryptedPassword: string): Promise<boolean> => {
    return await compare(senha, encryptedPassword);
  };

  private validAdministratorAuthentication = async (senha: string, administratorUser: Administrador | null): Promise<boolean> => {
    if (administratorUser === null) return false;
    
    return await this.matchPassword(senha, administratorUser.senha);
  };

  private validCoordinatorAuthentication = async (senha: string, coordinatorUser: Coordenacao | null): Promise<boolean> => {
    if (coordinatorUser === null) return false;

    return await this.matchPassword(senha, coordinatorUser.senha);
  };
}