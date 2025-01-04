import axios from "axios";

export const generateTalk = async (source_url: string, script: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/talks/create`,
      {
        source_url,
        script,
      }
    );

    const result = response.data;
    console.log(result);
  } catch (error) {
    console.error("Error generating talk:", error);
  }
};
