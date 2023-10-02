import { Router, } from "express";
import { AuthController, } from "./controllers/AuthController";

const router = Router();

const auth = new AuthController();

router.post("/login", auth.login);

export { router, };