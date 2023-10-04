import { Router, }                  from "express";
import { CourseAccountController, } from "../controllers/CourseAccountController";
import { checkAdministrator, }      from "../middleware/checkAdministrator";

const courseAccountController = new CourseAccountController();
const courseAccountsRoutes    = Router();

courseAccountsRoutes.get("/:idCourseAccount",                     courseAccountController.read   );
courseAccountsRoutes.put("/:idCourseAccount",                     courseAccountController.update );
courseAccountsRoutes.get("/"                , checkAdministrator, courseAccountController.readAll);

export { courseAccountsRoutes, };