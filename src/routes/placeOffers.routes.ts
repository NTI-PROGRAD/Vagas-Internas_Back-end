import { Router, } from "express";
import { PlaceOfferController, } from "../controllers/PlaceOfferController";
import { verifyLoggedUser, } from "../middleware/verifyLoggedUser";

const placeOfferController = new PlaceOfferController();
const placeOffersRoutes    = Router();

placeOffersRoutes.post("/", verifyLoggedUser, placeOfferController.create);

export { placeOffersRoutes, };