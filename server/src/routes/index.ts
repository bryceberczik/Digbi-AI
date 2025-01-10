import express from "express";
import authRoutes from "./auth-routes";
import apiRoutes from "./api/index";
import fileRoutes from "./file/fileRoutes";
import imageRoutes from "./image/imageRoutes";

import { authenticateToken } from "../utils/auth";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/api", authenticateToken, apiRoutes);
router.use("/file", fileRoutes);
router.use("/image", imageRoutes);

export default router;
