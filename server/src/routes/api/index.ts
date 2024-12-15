import { Router } from "express";
import { userRouter } from "./userRoutes";
import { askRouter } from "./askRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/ask", askRouter);

export default router;