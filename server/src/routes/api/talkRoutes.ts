import express from "express";
import { createTalk, getTalk } from "../../controllers/talkController";

const router = express.Router();

router.post("/create", createTalk);
router.get("/:id", getTalk);

export { router as talkRouter };
