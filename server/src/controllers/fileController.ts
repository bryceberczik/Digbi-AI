import { Request, Response } from "express";
import { File } from "../models";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();

export const getFiles = async (_req: Request, res: Response) => {
  try {
    const files = await File.findAll({
      attributes: ["id", "fileName", "fileSize"],
    });
    res.json(files);
  } catch (error) {
    console.error("Error fetching file metadata:", error);
    res.status(500).json({ error: "Failed to fetch file metadata." });
  }
};

export const getUserFiles = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userFiles = await File.findAll({
      where: { userId: id },
      attributes: ["id", "fileName", "fileSize"],
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
    const email = req.body.email;

    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: `${email}/${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(params).promise();

    const newFile = await File.create({
      userId: req.body.userId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      s3Url: data.Location,
      uploadedAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "File Uploaded Successfully.", file: newFile });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("Server Error");
  }
};

export const removeFile = async (req: Request, res: any) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const file = await File.findByPk(id);
    if (file) {
      if (!email) {
        return res.status(400).json({ message: "Missing user email." });
      }

      const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: `${email}/${file.fileName}`,
      };

      await s3.deleteObject(params).promise();
      await file.destroy();

      res.json({ message: "File deleted." });
    } else {
      res.status(404).json({ message: "File metadata not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
