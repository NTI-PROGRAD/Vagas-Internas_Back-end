import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";
import { AdministratorAccount, CourseAccount, } from "@prisma/client";
import { prismaClient, } from "../database/prismaClient";

export async function verifyLoggedUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization, } = request.headers;
  if (!authorization) throw new UnauthorizedError("O usuário não está logado!");

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const token = authorization?.split(" ")[1];
  const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);
  const userAccount = await getUserAccountIfExists(userId);

  if (!userAccount) throw new NotFoundError("O usuário indicado pelo token de acesso não foi encontrado!");

  next();
}

async function getUserAccountIfExists(userId: string): Promise<AdministratorAccount | CourseAccount | null>
{
  const administratorAccount = await prismaClient.administratorAccount.findFirst({ where: { id: userId, }, });
  if (administratorAccount) return administratorAccount;

  const courseAccount = await prismaClient.courseAccount.findFirst({ where: { id: userId, }, });
  if (courseAccount) return courseAccount;

  return null;
}