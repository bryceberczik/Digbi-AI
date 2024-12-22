import axios from "axios";

export const removeFile = async (fileId: string) => {
  try {
    await axios.delete(`http://localhost:3001/remove/${fileId}`);
  } catch (error) {
    console.error("Error removing JSON file:", error);
  }
};
