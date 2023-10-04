import { AdministratorAccount, } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Omit<AdministratorAccount, "password">>
    }
  }
}