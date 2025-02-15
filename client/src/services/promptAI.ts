export const promptAI = async (
  fileId: string,
  question: string,
  email: string
) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }
    const response = await fetch(`/api/ask/${fileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: question,
        email: email,
      }),
    });

    const data = await response.json();

    if (
      data.formattedResponse.error ===
      "Failed to parse the response from the model."
    ) {
      return {
        text: data.response,
      };
    }

    const sanitizedResult = data.response.replace(/```json|```/g, "");
    const parsedResult = JSON.parse(sanitizedResult);

    return {
      text: parsedResult.explanation,
    };
  } catch (error) {
    console.error("Request Failed:", error);
  }
};
