import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/userController";

const router = express.Router();

// GET /users - GET ALL USERS
router.get("/", getAllUsers);

// GET /users/:id - GET A USER BY ID
router.get("/:id", getUserById);

// POST /users/ - CREATE A USER
router.post("/", createUser);

// PUT /users/:id - UPDATE A USER
router.put("/:id", updateUser);

// DELETE /users/:id - DELETE A USER
router.delete("/:id", deleteUser);

export { router as userRouter };
