import { Router, Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const secretKey = process.env.JWT_SECRET_KEY || "";

  const token = jwt.sign(
    { id: user.id, username: user.username, email },
    secretKey,
    { expiresIn: "24h" }
  );
  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });

    console.log(newUser);

    const secretKey = process.env.JWT_SECRET_KEY || "";

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      secretKey,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

router.post("/login", login);
router.post("/signup", signUp);

export default router;
