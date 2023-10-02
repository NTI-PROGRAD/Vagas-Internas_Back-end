import { Administrador, } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Administrador>
    }
  }
}