import { Request, Response } from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

export const getImageUrl = async (req: Request, res: Response) => {
  const { key, email } = req.body;

  if (!key || !email) {
    return res
      .status(400)
      .json({ message: "Missing S3 key and/or user email." });
  }

  try {
    const fileKey = `${email}/images/${key}`;
    const imageUrl = `https://${bucket}.s3.amazonaws.com/${fileKey}`;

    return res.json({ imageUrl });
  } catch (error) {
    console.error("Error creating image URL:", error);
    throw new Error("Failed to create image URL.");
  }
};
