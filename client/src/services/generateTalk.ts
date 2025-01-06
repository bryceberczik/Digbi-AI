import axios from "axios";

export const generateTalk = async (source_url: string, input: string) => {
  try {
    const script = {
      type: "text",
      input: input,
    };

    const postResponse = await axios.post(
      `http://localhost:3001/api/talks/create`,
      {
        source_url,
        script,
      }
    );

    const videoId = postResponse.data.id;

    if (!videoId) {
      throw new Error("Failed to create talk: No ID returned from backend.");
    }

    console.log(`Talk created with ID: ${videoId}`);

    const maxAttempts = 10;
    const interval = 2000;
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts++;

      console.log(`Polling attempt ${attempts}/${maxAttempts}...`);

      const getResponse = await axios.get(
        `http://localhost:3001/api/talks/${videoId}`
      );

      const status = getResponse.data.status;

      if (status === "done") {
        console.log("Talk is ready!");
        console.log(getResponse.data);
        return getResponse.data;
      }

      if (status === "error") {
        throw new Error("Talk processing failed.");
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error(
      "Polling timed out: Talk not ready after maximum attempts."
    );
  } catch (error: any) {
    console.error(
      "Error generating talk:",
      error.response?.data || error.message
    );
    throw error;
  }
};
