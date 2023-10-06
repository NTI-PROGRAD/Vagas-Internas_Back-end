import { Router, }                  from "express";
import { GrantedTimeController, }   from "../controllers/GrantedTimeController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";
import { verifyLoggedUser, }        from "../middleware/verifyLoggedUser";

const grantedTimeController = new GrantedTimeController();
const grantedTimeRoutes     = Router();

grantedTimeRoutes.post("/", verifyAdministratorUser, grantedTimeController.create);
grantedTimeRoutes.get("/:idGrantedTime", verifyLoggedUser, grantedTimeController.read);
grantedTimeRoutes.delete("/:idGrantedTime", verifyAdministratorUser, grantedTimeController.delete);
grantedTimeRoutes.get("/", verifyAdministratorUser, grantedTimeController.readAll);

grantedTimeRoutes.get("/:idCourseAccount", verifyLoggedUser, grantedTimeController.readGrantedTimesByCourseAccount);

export { grantedTimeRoutes, };