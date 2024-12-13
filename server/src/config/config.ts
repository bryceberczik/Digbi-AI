import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "";

export default apiKey;
