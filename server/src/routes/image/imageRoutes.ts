import express from "express";
import {
  upload,
  uploadImage,
  getImageUrl,
} from "../../controllers/imageController";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImageUrl);

export default router;
