import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";

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
  const administratorExists = await administratorUserExists(userId);

  if (!administratorExists) throw new NotFoundError("Usuário não encontrado!");

  next();
};

const administratorUserExists = async (userId: string): Promise<boolean> => {
  const administratorUser = await prismaClient.administrador.findFirst({ where: { id: userId, }, });
  return (administratorUser !== null);
};