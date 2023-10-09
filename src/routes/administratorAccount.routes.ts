import { Router, } from "express";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";
import { AdministratorAccountController, } from "../controllers/AdministratorAccountController";

const administratorAccountController = new AdministratorAccountController();
const administratorAccountRoutes = Router();

administratorAccountRoutes.get("/:idAdministratorAccount", verifyAdministratorUser, administratorAccountController.read);
administratorAccountRoutes.put("/:idAdministratorAccount", verifyAdministratorUser, administratorAccountController.update);
administratorAccountRoutes.get("/", verifyAdministratorUser, administratorAccountController.readAll);

export { administratorAccountRoutes, };