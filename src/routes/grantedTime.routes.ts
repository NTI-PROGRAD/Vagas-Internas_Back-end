import { Router, }                from "express";
import { GrantedTimeController, } from "../controllers/GrantedTimeController";
import { checkAdministrator, }    from "../middleware/checkAdministrator";

const grantedTimeController = new GrantedTimeController();
const grantedTimeRoutes     = Router();

grantedTimeRoutes.post("/", checkAdministrator, grantedTimeController.create);
grantedTimeRoutes.get("/:idGrantedTime", grantedTimeController.read);
grantedTimeRoutes.delete("/:idGrantedTime", checkAdministrator, grantedTimeController.delete);
grantedTimeRoutes.get("/", checkAdministrator, grantedTimeController.readAll);

grantedTimeRoutes.get("/:idCourseAccount",grantedTimeController.readGrantedTimesByCourseAccount);

export { grantedTimeRoutes, };