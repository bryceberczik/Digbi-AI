import { Request, Response } from "express";
import { File } from "../models";

export const uploadFile = async (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const newFile = await File.create({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      content: JSON.parse(req.file.buffer.toString()),
      uploadedAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
