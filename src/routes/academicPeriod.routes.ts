import { Router, }                   from "express";
import { AcademicPeriodController, } from "../controllers/AcademicPeriodController";
import { verifyAdministratorUser, }  from "../middleware/verifyAdministratorUser";

const academicPeriodController = new AcademicPeriodController();
const academicPeriodRoutes     = Router();

academicPeriodRoutes.post("/", verifyAdministratorUser, academicPeriodController.create);
academicPeriodRoutes.post("/:idAcademicPeriod", verifyAdministratorUser, academicPeriodController.setActiveAcademicPeriod);
academicPeriodRoutes.get("/", verifyAdministratorUser, academicPeriodController.readAll);
academicPeriodRoutes.get("/:label", verifyAdministratorUser, academicPeriodController.readByLabel);

export { academicPeriodRoutes, };