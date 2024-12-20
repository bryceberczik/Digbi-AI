import express from "express";
import { askQuestion } from "../../controllers/askController";

const router = express.Router();

router.use("/:id", askQuestion);

export { router as askRouter };
