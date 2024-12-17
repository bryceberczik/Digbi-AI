export const promptAI = async (fileId: string, question: string) => {
  try {
    const response = await fetch(`http://localhost3001/api/ask/${fileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Response:", data);
      // Handle the response data (formattedResponse, etc.)
    } else {
      console.error("Error:", data.response);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};
