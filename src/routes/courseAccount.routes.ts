import { Router, }                  from "express";
import { CourseAccountController, } from "../controllers/CourseAccountController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";
import { verifyLoggedUser, }        from "../middleware/verifyLoggedUser";

const courseAccountController = new CourseAccountController();
const courseAccountsRoutes    = Router();

courseAccountsRoutes.get("/:idCourseAccount", verifyLoggedUser, courseAccountController.read);
courseAccountsRoutes.put("/:idCourseAccount", verifyLoggedUser, courseAccountController.update);
courseAccountsRoutes.get("/", verifyAdministratorUser, courseAccountController.readAll);

export { courseAccountsRoutes, };