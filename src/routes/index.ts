import { Router } from "express";
import historyRouter from "./historyRouter";
import mainRouter from "./mainRouter";

const router = Router();

router.use("/main", mainRouter);
router.use("/history", historyRouter);

export default router;
