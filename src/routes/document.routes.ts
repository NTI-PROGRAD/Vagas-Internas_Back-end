import { Router, } from "express";
import { DocumentGenerator, } from "../controllers/DocumentGeneratorController";

const documentGeneratorController = new DocumentGenerator();
const documentRoutes = Router();

documentRoutes.get("/gerar-docx", documentGeneratorController.generateDocx);

export { documentRoutes, };