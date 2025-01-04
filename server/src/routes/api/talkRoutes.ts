import express from "express";
import { createTalk, getTalk } from "../../controllers/talkController";

const router = express.Router();

router.get("/:id", getTalk);
router.post("/create", createTalk);

export { router as talkRouter };