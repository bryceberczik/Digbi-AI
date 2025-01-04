import axios from "axios";

export const removeFile = async (fileId: string, email: string) => {
  try {
    await axios.delete(`http://localhost:3001/file/remove/${fileId}`, {
      data: { email },
    });
  } catch (error) {
    console.error("Error removing JSON file:", error);
  }
};
