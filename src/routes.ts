import { Router, } from "express";

import { checkAdministrator, } from "./middleware/checkAdministrator";

import { AuthController, } from "./controllers/AuthController";
import { GrantedTimeController, } from "./controllers/GrantedTimeController";
import { CourseAccountController, } from "./controllers/CourseAccountController";
import { AcademicPeriodController, } from "./controllers/AcademicPeriodController";

const authController           = new AuthController();
const grantedTimeController    = new GrantedTimeController();
const coordinationController   = new CourseAccountController();
const academicPeriodController = new AcademicPeriodController();

const router = Router();

router.post("/login", authController.login);

router.post("/prazo_de_acesso", checkAdministrator, grantedTimeController.create);
router.get("/prazo_de_acesso/:idCourseAccount", grantedTimeController.read);
router.delete("/prazo_de_acesso/:idGrantedTime", checkAdministrator, grantedTimeController.delete);
router.get("/prazo_de_acesso", checkAdministrator, grantedTimeController.readAll);

router.get("/coordenacao/:idCourseAccount", coordinationController.read);
router.put("/coordenacao/:idCourseAccount", coordinationController.update);
router.get("/coordenacao/", checkAdministrator, coordinationController.readAll);

router.post("/periodo_academico", checkAdministrator, academicPeriodController.create);

export { router, };