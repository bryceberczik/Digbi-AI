import axios from "axios";

export const generateTalk = async (source_url: string, input: string) => {
  try {
    const script = {
      type: "text",
      input: input,
    };

    await axios.post(`http://localhost:3001/api/talks/create`, {
      source_url,
      script,
    });
  } catch (error: any) {
    console.error("Error generating talk:", error.response?.data);
  }
};
