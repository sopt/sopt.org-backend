import { Router } from "express";
import { mainController } from "../controllers";

const router = Router();

router.get("/project", mainController.getProject);

export default router;
