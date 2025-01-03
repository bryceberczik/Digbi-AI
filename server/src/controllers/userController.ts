import { Request, Response } from "express";
import { User } from "../models/index";
import { createUserFolder } from "../utils/createUserFolder";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    await createUserFolder(username);

    res.status(201).json(user);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("Duplicate entry for username or email.");
    }

    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      if (username !== undefined) user.username = username;
      if (email !== undefined) user.email = email;
      if (password !== undefined) user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
