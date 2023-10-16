import { Router, }                   from "express";
import { AcademicPeriodController, } from "../controllers/AcademicPeriodController";
import { verifyAdministratorUser, }  from "../middleware/verifyAdministratorUser";
import { verifyLoggedUser, } from "../middleware/verifyLoggedUser";

const academicPeriodController = new AcademicPeriodController();
const academicPeriodRoutes     = Router();

academicPeriodRoutes.post("/", verifyAdministratorUser, academicPeriodController.createNextAcademicPeriod);
academicPeriodRoutes.post("/:idAcademicPeriod", verifyAdministratorUser, academicPeriodController.setActiveAcademicPeriod);
academicPeriodRoutes.get("/", verifyAdministratorUser, academicPeriodController.readAll);
academicPeriodRoutes.get("/ativo", verifyLoggedUser, academicPeriodController.readActiveAcademicPeriod);
academicPeriodRoutes.get("/:label", verifyAdministratorUser, academicPeriodController.readByLabel);

export { academicPeriodRoutes, };