import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";
import { Administrador, } from "@prisma/client";

export const checkAdministrator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const { authorization, } = request.headers;
  if (!authorization) throw new UnauthorizedError("Token não encontrado!");

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const token = authorization?.split(" ")[1];
  const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);
  const administrator = await getAdministratorUserIfExists(userId);

  if (!administrator) throw new NotFoundError("Usuário não encontrado!");

  const { senha: _, ...loggedUser } = administrator;
  request.user = loggedUser;

  next();
};

const getAdministratorUserIfExists = async (userId: string): Promise<Administrador | null> => {
  return await prismaClient.administrador.findFirst({ where: { id: userId, }, });
};