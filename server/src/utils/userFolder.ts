import AWS from "../config/awsConfig";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();

export const createUserFolder = async (email: string) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: `${email}/`,
    };

    await s3.putObject(params).promise();

    console.log(`User S3 folder created successfully.`);
  } catch (error) {
    console.error("Error creating user S3 folder:", error);
    throw new Error("Failed to create user S3 folder.");
  }
};

export const deleteUserFoler = async (email: string) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: `${email}/`,
    };

    await s3.deleteObject(params).promise();

    console.log(`User S3 folder deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user S3 folder:", error);
    throw new Error("Failed to delete user S3 folder.");
  }
};
