import AWS from "../config/awsConfig";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

export const createUserFolder = async (email: string) => {
  try {
    const params = {
      Bucket: bucket,
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
    const prefix = `${email}/`;
    const listParams = {
      Bucket: bucket,
      Prefix: prefix,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucket,
        Delete: {
          Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
          Quiet: true,
        },
      };

      await s3.deleteObjects(deleteParams).promise();
      console.log(`All JSON files in ${prefix} deleted successfully.`);
    }

    // const folderParams = {
    //   Bucket: bucket,
    //   Key: prefix,
    // };

    // await s3.deleteObject(folderParams).promise();
    console.log(`User S3 folder deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user S3 folder:", error);
    throw new Error("Failed to delete user S3 folder.");
  }
};
