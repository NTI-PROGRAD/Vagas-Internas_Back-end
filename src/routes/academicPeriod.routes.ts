import { Router, }                   from "express";
import { AcademicPeriodController, } from "../controllers/AcademicPeriodController";
import { checkAdministrator, }       from "../middleware/checkAdministrator";

const academicPeriodController = new AcademicPeriodController();
const academicPeriodRoutes     = Router();

academicPeriodRoutes.post("/", checkAdministrator, academicPeriodController.create);
academicPeriodRoutes.post("/:idAcademicPeriod", checkAdministrator, academicPeriodController.setActiveAcademicPeriod);

export { academicPeriodRoutes, };