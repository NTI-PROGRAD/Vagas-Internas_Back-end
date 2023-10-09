import { Router, } from "express";
import { verifyLoggedUser, } from "../middleware/verifyLoggedUser";
import { CourseController, } from "../controllers/CourseController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";

const courseController = new CourseController();
const courseRoutes = Router();

courseRoutes.get("/query", verifyLoggedUser, courseController.readByName);
courseRoutes.get("/", verifyAdministratorUser, courseController.readAll);
courseRoutes.get("/:idCourse", verifyLoggedUser, courseController.readById);

export { courseRoutes, };