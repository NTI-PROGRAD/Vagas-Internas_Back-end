import { JwtPayload, } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface UserIdJwtPayload extends JwtPayload {
    userId: string;
  }
}