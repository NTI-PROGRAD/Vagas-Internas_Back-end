import { Administrador, } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Omit<Administrador, "senha">>
    }
  }
}