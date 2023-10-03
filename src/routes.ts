import { Router, } from "express";
import { AuthController, } from "./controllers/AuthController";
import { TermController, } from "./controllers/TermController";
import { checkAdministrator, } from "./middleware/checkAdministrator";
import { CoordinationController, } from "./controllers/CoordinationController";
import { AcademicPeriodController, } from "./controllers/AcademicPeriodController";

const router = Router();

const auth = new AuthController();
const term = new TermController();
const coordinationController = new CoordinationController();
const academicPeriodController = new AcademicPeriodController();

router.post("/login", auth.login);

router.get("/prazo_de_acesso/:id_coordenacao", term.read);
router.get("/prazo_de_acesso", checkAdministrator, term.readAll);
router.post("/prazo_de_acesso", checkAdministrator, term.create);
router.delete("/prazo_de_acesso/:id_prazo", checkAdministrator, term.delete);

router.get("/coordenacao/:id_coordenacao", coordinationController.read);
router.get("/coordenacao/", checkAdministrator, coordinationController.readAll);
router.put("/coordenacao/:id_coordenacao", coordinationController.update);

router.post("/periodo_academico", checkAdministrator, academicPeriodController.create);

export { router, };