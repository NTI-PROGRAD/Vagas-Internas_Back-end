import { Router, }               from "express";
import { grantedTimeRoutes, }    from "./grantedTime.routes";
import { courseAccountsRoutes, } from "./courseAccount.routes";
import { academicPeriodRoutes, } from "./academicPeriod.routes";
import { authenticationRoutes, } from "./authentication.routes";

const router = Router();

router.use("/autenticacao"     , authenticationRoutes);
router.use("/prazo_de_acesso"  , grantedTimeRoutes   );
router.use("/conta_de_curso"   , courseAccountsRoutes);
router.use("/periodo_academico", academicPeriodRoutes);

export { router, };