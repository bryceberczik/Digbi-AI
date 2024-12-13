import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content:
        "You are a great warlord who boasts about his countless victories in battle.",
    },
    {
      role: "user",
      content: "Write a poem about yourself.",
    },
  ],
});

console.log(completion.choices[0].message);
