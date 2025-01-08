import axios from "axios";

export const generateTalk = async (
  source_url: string,
  input: string,
  voice: string
) => {
  let script;

  // Voice is "woman" by default.

  try {
    if (voice === "man") {
      script = {
        type: "text",
        input: input,
        provider: {
          type: "elevenlabs",
          voice_id: "iP95p4xoKVk53GoZ742B",
        },
      };
    } else {
      script = {
        type: "text",
        input: input,
      };
    }

    const postResponse = await axios.post(
      `http://localhost:3001/api/talks/create`,
      {
        source_url,
        script,
      }
    );

    const videoId = postResponse.data.id;

    if (!videoId) {
      return {
        success: false,
        message:
          "Unable to provide a response at this time. Please reach out to our development team regarding this issue.",
      };
    }

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
        return {
          success: true,
          result_url: getResponse.data.result_url,
        };
      }

      if (status === "error") {
        return {
          success: false,
          message:
            "Unable to use given image. Please provide an image that has a clear facial structure.",
        };
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return {
      success: false,
      message:
        "An error has occurred. Please try again, use a different image, or reach out to our development team regarding this issue.",
    };
  } catch (error: any) {
    console.error(
      "Error generating talk:",
      error.response?.data || error.message
    );

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};
