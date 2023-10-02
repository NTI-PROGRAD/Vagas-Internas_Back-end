import { Request, Response, NextFunction, } from "express";
import jwt, { UserIdJwtPayload, } from "jsonwebtoken";
import { prismaClient, } from "../database/prismaClient";

export const checkAdministrator = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const { authorization, } = request.headers;
  if (!authorization) response.status(400).json({ message: "Unauthorized User!", });

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  const token = authorization?.split(" ")[1];
  const { userId, } = <UserIdJwtPayload>jwt.verify(token ?? "", jwtSecretKey);
  const administratorExists = await administratorUserExists(userId);

  if (!administratorExists) response.status(400).json({ message: "Unauthorized User!", });

  next();
};

const administratorUserExists = async (userId: string): Promise<boolean> => {
  const administratorUser = await prismaClient.administrador.findFirst({ where: { id: userId, }, });
  return (administratorUser !== null);
};