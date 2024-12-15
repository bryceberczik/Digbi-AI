import { Request, Response } from "express";
import { File } from "../models";
import fs from "fs";

export const getFiles = async (req: Request, res: Response) => {
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
