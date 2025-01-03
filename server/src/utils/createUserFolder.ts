import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();

export const createUserFolder = async (username: string) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: `${username}`,
    };

    await s3.putObject(params).promise();

    console.log(`User S3 folder created successfully.`);
  } catch (error) {
    console.error("Error creating user S3 folder:", error);
    throw new Error("Failed to create user S3 folder.");
  }
};
