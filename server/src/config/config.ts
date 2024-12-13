import dotenv from "dotenv";

dotenv.config();

export const apiKey = process.env.OPENAI_API_KEY || "";
