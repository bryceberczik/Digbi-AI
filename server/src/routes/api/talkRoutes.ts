import express from "express";
import { createTalk, getTalk, talkWebhook } from "../../controllers/talkController";

const router = express.Router();

router.post("/create", createTalk);
router.get("/:id", getTalk);
router.post("/webhook", talkWebhook);

export { router as talkRouter };