import { Router } from "express";
import { userRouter } from "./userRoutes";
import { askRouter } from "./askRoutes";
import { talkRouter } from "./talkRoutes";

const router = Router();

router.use("/users", userRouter);
router.use("/talks", talkRouter);
router.use("/ask", askRouter);

export default router;
