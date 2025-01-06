import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.DID_AUTH_API;

export const createTalk = async (req: Request, res: any) => {
  try {
    const { source_url, script } = req.body;

    if (!source_url || !script) {
      return res
        .status(400)
        .json({ message: "Missing required fields: source_url or script" });
    }

    console.log("Console from createTalk");

    const response = await axios.post(
      "https://api.d-id.com/talks",
      {
        source_url,
        script,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from external API:", response.data);
  } catch (error: any) {
    console.error("An error occurred while processing the request.");
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);

    res.status(error.response?.status || 500).json({
      message: "An error occurred while processing your request.",
      errorDetails:
        error.response?.data ||
        "An unknown error occurred. Please try again later.",
    });
  }
};

export const getTalk = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`https://api.d-id.com/talks/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("An error occurred while processing the request.");
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);

    res.status(error.response?.status || 500).json({
      message: "An error occurred while processing your request.",
      errorDetails:
        error.response?.data ||
        "An unknown error occurred. Please try again later.",
    });
  }
};
