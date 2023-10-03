import { Router, } from "express";
import { AuthController, } from "./controllers/AuthController";
import { TermController, } from "./controllers/TermController";
import { checkAdministrator, } from "./middleware/checkAdministrator";

const router = Router();

const auth = new AuthController();
const term = new TermController();

router.post("/login", auth.login);

router.get("/prazo_de_acesso/:id_coordenacao", term.read);
router.post("/prazo_de_acesso", checkAdministrator, term.create);
router.delete("/prazo_de_acesso/:id_prazo", checkAdministrator, term.delete);

export { router, };