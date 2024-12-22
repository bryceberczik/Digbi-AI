import { type Request, type Response } from "express";
import { File } from "../models";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import AWS from "../config/awsConfig";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

if (apiKey) {
  model = new OpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: "gpt-4o",
  });
} else {
  console.error("OPENAI_API_KEY is not configured.");
}

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "The code snippet extracted from the JSON data.",
  explanation: "A detailed explanation of the code snippet.",
});

const formatInstructions = parser.getFormatInstructions();

const promptTemplate = new PromptTemplate({
  template:
    "Your name is Digbi AI. You are an expert at analyzing JSON data and will not answer to anything that isn't related to JSON data. You will be given a JSON file and a prompt. Your goal is to find patterns in the given JSON data, and answer to the given prompt in a concise, but informative manner. If the question is not related to a JSON file, remind the user in a friendly manner that you only analyze JSON data. If the question seems to be focused on a different JSON file, let the user know that they may not be referencing the given JSON file; unless specified otherwise. If the user asks questions about what you do or any other kinds of clarifying questions, explain to the user what your purpose is in a friendly and informative manner.\n{format_instructions}\nHere is the JSON data: {json_data}\n{question}",
  inputVariables: ["question", "json_data"],
  partialVariables: { format_instructions: formatInstructions },
});

const formatPrompt = async (
  question: string,
  jsonData: string
): Promise<string> => {
  return await promptTemplate.format({ question, json_data: jsonData });
};

const promptFunc = async (input: string): Promise<string> => {
  try {
    if (model) {
      return await model.invoke(input);
    }
    return '```json\n{\n    "code": "No OpenAI API key provided.",\n    "explanation": "Unable to provide a response."\n}\n```';
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const parseResponse = async (
  response: string
): Promise<{ [key: string]: string }> => {
  try {
    return await parser.parse(response);
  } catch (err) {
    console.error("Error in parseResponse:", err);
    return { error: "Failed to parse the response from the model." };
  }
};

// ! EXPORTED FUNCTION ! //

export const askQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userQuestion: string = req.body.question;

  try {
    if (!userQuestion) {
      res.status(400).json({
        question: null,
        response: "Please provide a question in the request body.",
        formattedResponse: null,
        audioUrl: null,
      });
      return;
    }

    const file = await File.findOne({ where: { id } });
    if (!file) {
      res.status(404).json({
        question: userQuestion,
        response: "File not found.",
        formattedResponse: null,
        audioUrl: null,
      });
      return;
    }

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: file.s3Url.split("/").pop()!,
    };

    const s3Response = await s3.getObject(params).promise();

    if (!s3Response.Body) {
      throw new Error("No body found in S3 response.");
    }

    const jsonData = JSON.parse(s3Response.Body.toString("utf-8"));

    const formattedPrompt: string = await formatPrompt(
      userQuestion,
      JSON.stringify(jsonData)
    );

    const rawResponse: string = await promptFunc(formattedPrompt);
    const result: { [key: string]: string } = await parseResponse(rawResponse);

    const polly = new AWS.Polly();
    const speechParams = {
      Text:
        result.explanation ||
        rawResponse ||
        "Sorry, I can not generate speech at this time. Please reach out to our development team.",
      OutputFormat: "mp3",
      VoiceId: "Joanna", // or Salli
      Engine: "neural",
    };

    const speechData = await polly.synthesizeSpeech(speechParams).promise();
    const audioFileName = `response_${Date.now()}.mp3`;
    const audioFilePath = path.join(__dirname, "../../db/audio", audioFileName);

    fs.writeFileSync(audioFilePath, speechData.AudioStream as Buffer);

    const audioUrl = `${req.protocol}://${req.get(
      "host"
    )}/audio/${audioFileName}`;

    res.json({
      question: userQuestion,
      jsonId: id,
      jsonData: jsonData,
      prompt: formattedPrompt,
      response: rawResponse,
      formattedResponse: result,
      audioUrl: audioUrl,
    });

    setTimeout(() => {
      fs.unlinkSync(audioFilePath);
    }, 1000);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }

    res.status(500).json({
      question: userQuestion,
      prompt: null,
      response: "Internal Server Error",
      formattedResponse: null,
      audioUrl: null,
    });
  }
};
