import express from "express";
import { askQuestion } from "../../controllers/askController";

const router = express.Router();

router.use("/ask:id", askQuestion);

export default router;