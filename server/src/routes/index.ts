import express from "express";
import apiRoutes from "./api/askRoutes";
import fileRoutes from "./file/fileRoutes";

const router = express.Router();

router.use("/api", apiRoutes);
router.use("/file", fileRoutes);

export default router;
