import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";
import { AdministratorAccount, } from "@prisma/client";

export async function verifyAdministratorUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization, } = request.headers;
  if (!authorization) throw new UnauthorizedError("Token não encontrado!");
  
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  
  const token = authorization?.split(" ")[1];
  const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);
  const administrator = await getAdministratorAccountIfExists(userId);

  if (!administrator) throw new NotFoundError("Usuário não encontrado!");

  const { password: _, ...loggedUser } = administrator;
  request.user = loggedUser;

  next();
}

async function getAdministratorAccountIfExists(userId: string): Promise<AdministratorAccount | null>
{
  return await prismaClient.administratorAccount.findFirst({ where: { id: userId, }, });
}