import express from "express";
import upload from "../../config/upload";
import { getFiles, uploadFile } from "../../controllers/fileController";

const router = express.Router();

router.get("/", getFiles);
router.post("/upload", upload.single("file"), uploadFile);

export default router;
