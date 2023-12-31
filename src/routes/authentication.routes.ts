import { Router, }         from "express";
import { AuthController, } from "../controllers/AuthController";

const authController       = new AuthController();
const authenticationRoutes = Router();

authenticationRoutes.post("/login", authController.login);
authenticationRoutes.post("/isAuthenticated", authController.isAuthenticated);

export { authenticationRoutes, };