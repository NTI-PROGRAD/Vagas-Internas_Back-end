import { Router, }                  from "express";
import { GrantedTimeController, }   from "../controllers/GrantedTimeController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";

const grantedTimeController = new GrantedTimeController();
const grantedTimeRoutes     = Router();

grantedTimeRoutes.post("/", verifyAdministratorUser, grantedTimeController.create);
grantedTimeRoutes.get("/:idGrantedTime", grantedTimeController.read);
grantedTimeRoutes.delete("/:idGrantedTime", verifyAdministratorUser, grantedTimeController.delete);
grantedTimeRoutes.get("/", verifyAdministratorUser, grantedTimeController.readAll);

grantedTimeRoutes.get("/:idCourseAccount",grantedTimeController.readGrantedTimesByCourseAccount);

export { grantedTimeRoutes, };