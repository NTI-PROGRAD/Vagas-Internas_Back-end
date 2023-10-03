import { Router, } from "express";
import { AuthController, } from "./controllers/AuthController";
import { TermController, } from "./controllers/TermController";
import { checkAdministrator, } from "./middleware/checkAdministrator";

const router = Router();

const auth = new AuthController();
const term = new TermController();

router.post("/login", auth.login);
router.post("/prazo_de_acesso", checkAdministrator, term.create);

export { router, };