import express from "express";
import upload from "../../config/upload";
import { uploadFile } from "../../controllers/fileController";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
