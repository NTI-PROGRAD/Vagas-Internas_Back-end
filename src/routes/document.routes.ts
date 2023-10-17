import { Router, } from "express";
import { DocumentGenerator, } from "../controllers/DocumentGeneratorController";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";

const documentGeneratorController = new DocumentGenerator();
const documentRoutes = Router();

documentRoutes.get("/gerar-docx", verifyAdministratorUser, documentGeneratorController.generateDocx);

export { documentRoutes, };