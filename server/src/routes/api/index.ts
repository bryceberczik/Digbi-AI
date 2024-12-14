import askRoutes from "./askRoutes";
import express from "express";
const router = express.Router();

router.use("/ask", askRoutes);

export default router;