import express from "express";
import { createTalk } from "../../controllers/talkController";

const router = express.Router();

router.post("/create", createTalk)

export { router as talkRouter };