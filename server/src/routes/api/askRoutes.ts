import express from "express";
import { askQuestion } from "../../controllers/askController";

const router = express.Router();

router.use("/", askQuestion);

export { router as askRouter };