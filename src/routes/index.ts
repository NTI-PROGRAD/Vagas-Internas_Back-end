import { Router, } from "express";
import { grantedTimeRoutes, } from "./grantedTime.routes";
import { courseAccountsRoutes, } from "./courseAccount.routes";
import { academicPeriodRoutes, } from "./academicPeriod.routes";
import { authenticationRoutes, } from "./authentication.routes";
import { placeOffersRoutes, } from "./placeOffers.routes";
import { administratorAccountRoutes, } from "./administratorAccount.routes";
import { courseRoutes, } from "./course.routes";
import { documentRoutes, } from "./document.routes";

const router = Router();

router.use("/autenticacao", authenticationRoutes);
router.use("/prazo_de_acesso", grantedTimeRoutes);
router.use("/conta_de_curso", courseAccountsRoutes);
router.use("/periodo_academico", academicPeriodRoutes);
router.use("/oferta_de_vagas", placeOffersRoutes);
router.use("/conta_administrativa", administratorAccountRoutes);
router.use("/curso", courseRoutes);
router.use("/documento", documentRoutes);

export { router, };