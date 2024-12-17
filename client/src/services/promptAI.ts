export const promptAI = async (fileId: string, question: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/ask/${fileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const data = await response.json();

    console.log(data.formattedResponse.error);
    if (data.formattedResponse.error === "Failed to parse the response from the model.") {
      return data.response;
    }

    const sanitizedResult = data.response.replace(/```json|```/g, "");
    const parsedResult = JSON.parse(sanitizedResult);

    return parsedResult.explanation;
  } catch (error) {
    console.error("Request Failed:", error);
  }
};
