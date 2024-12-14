import express from "express";
import { askQuestion } from "../../controllers/askController";

const router = express.Router();

router.post("/ask", askQuestion);

export default router;