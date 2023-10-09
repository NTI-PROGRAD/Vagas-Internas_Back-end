import { Router, } from "express";
import { PlaceOfferController, } from "../controllers/PlaceOfferController";
import { verifyLoggedUser, } from "../middleware/verifyLoggedUser";
import { verifyAdministratorUser, } from "../middleware/verifyAdministratorUser";

const placeOfferController = new PlaceOfferController();
const placeOffersRoutes    = Router();

placeOffersRoutes.post("/", verifyLoggedUser, placeOfferController.create);
placeOffersRoutes.post("/periodo_academico_ativo", verifyLoggedUser, placeOfferController.createByActiveAcademicPeriod);
placeOffersRoutes.get("/periodo_academico_ativo", verifyAdministratorUser, placeOfferController.readByActiveAcademicPeriod);
placeOffersRoutes.get("/conta_de_curso/:idCourse", verifyLoggedUser, placeOfferController.readByCourseAccount);
placeOffersRoutes.get("/periodo_academico/:idAcademicPeriod", verifyAdministratorUser, placeOfferController.readByAcademicPeriod);
placeOffersRoutes.get("/:idCourse/:idAcademicPeriod", verifyLoggedUser, placeOfferController.read);

export { placeOffersRoutes, };