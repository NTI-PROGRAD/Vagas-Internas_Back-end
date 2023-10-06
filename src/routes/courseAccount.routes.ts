import { Router, }                  from "express";
import { CourseAccountController, } from "../controllers/CourseAccountController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";

const courseAccountController = new CourseAccountController();
const courseAccountsRoutes    = Router();

courseAccountsRoutes.get("/:idCourseAccount",courseAccountController.read);
courseAccountsRoutes.put("/:idCourseAccount",courseAccountController.update);
courseAccountsRoutes.get("/", verifyAdministratorUser, courseAccountController.readAll);

export { courseAccountsRoutes, };