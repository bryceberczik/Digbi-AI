import axios from "axios";

export const uploadFile = async (file: File, userId: string, email: string) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);
    data.append("email", email);

    // console.log(data.get("file"));
    // console.log(data.get("userId"));
    // console.log(data.get("email"));

    await axios.post(`http://localhost:3001/file/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading JSON file:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Non-Axios error:", error);
    }
  }
};
