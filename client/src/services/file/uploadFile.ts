import axios from "axios";

export const uploadFile = async (file: File, userId: string, email: string) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);
    data.append("email", email);

    await axios.post(`/file/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading JSON file:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios Error Details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Non-Axios Error:", error);
    }
  }
};
