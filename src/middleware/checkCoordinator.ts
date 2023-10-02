import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError, } from "../helpers/api-errors";

export const checkCoordinator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  const { authorization, } = request.headers;
  if (!authorization) throw new UnauthorizedError("Token não encontrado!");

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const token = authorization?.split(" ")[1];
  const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);
  const coordinatorExists = await coordinatorUserExists(userId);

  if (!coordinatorExists) throw new NotFoundError("Usuário não encontrado!");

  next();
};

const coordinatorUserExists = async (userId: string): Promise<boolean> => {
  const coordinatorUser = await prismaClient.coordenacao.findFirst({ where: { id: userId, }, });
  return (coordinatorUser !== null);
};