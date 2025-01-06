import axios from "axios";

export const generateTalk = async (source_url: string, input: string) => {
  try {
    const script = {
      type: "text",
      input: input,
    };

    // Step 1: Send the POST request to create the talk
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

    // Step 2: Poll the GET endpoint to check the talk's status
    const maxAttempts = 10; // Max polling attempts
    const interval = 2000; // Polling interval in milliseconds
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts++;

      console.log(`Polling attempt ${attempts}/${maxAttempts}...`);

      // Send GET request to check the status
      const getResponse = await axios.get(
        `http://localhost:3001/api/talks/${videoId}`
      );

      const status = getResponse.data.status;

      if (status === "done") {
        console.log("Talk is ready!");
        console.log(getResponse.data);
        return getResponse.data; // Return the final result
      }

      if (status === "error") {
        throw new Error("Talk processing failed.");
      }

      // Wait for the next polling interval
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    throw new Error("Polling timed out: Talk not ready after maximum attempts.");
  } catch (error: any) {
    console.error("Error generating talk:", error.response?.data || error.message);
    throw error; // Re-throw the error so the caller can handle it
  }
};
