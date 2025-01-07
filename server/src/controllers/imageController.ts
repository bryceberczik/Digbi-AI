import { Request } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (req: Request, res: any) => {
  const { email } = req.body;

  if (!req.file || !email) {
    return res.status(400).json({ message: "Missing image and/or email." });
  }

  try {
    const file = req.file;
    const fileKey = `${email}/images/${file.originalname}`;

    const params = {
      Bucket: bucket,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();

    res.status(200).json({
      message: "Image Uploaded Successfully.",
      imageUrl: data.Location,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("Server Error");
  }
};

export const getImageUrl = async (req: Request, res: any) => {
  const { key, email } = req.query;

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
