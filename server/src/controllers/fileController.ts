import { Request, Response } from "express";
import { File } from "../models";
import path from "path";
import fs from "fs";

export const getFiles = async (_req: Request, res: Response) => {
  try {
    const files = await File.findAll({
      attributes: ["id", "fileName"],
    });
    res.json(files);
  } catch (error) {
    console.error("Error fetching file metadata:", error);
    res.status(500).json({ error: "Failed to fetch file metadata." });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const userFiles = await File.findAll({
      where: { userId },
      attributes: ["id", "fileName"],
    });
    res.json(userFiles);
  } catch (error) {
    console.error("Error fetching file metadata:", error);
    res.status(500).json({ error: "Failed to fetch file metadata." });
  }
};

export const uploadFile = async (req: Request, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const fileContent = fs.readFileSync(req.file.path, "utf-8");

    const parsedContent = JSON.parse(fileContent);

    const newFile = await File.create({
      userId: req.body.userId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      content: parsedContent,
      uploadedAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "File Uploaded Successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const removeFile = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const file = await File.findByPk(id);
    if (file) {
      const filePath = path.join(__dirname, "../../db/json", file.fileName);

      fs.unlinkSync(filePath);
      await file.destroy();

      res.json({ message: "File deleted." });
    } else {
      res.status(404).json({ message: "File metadata not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
