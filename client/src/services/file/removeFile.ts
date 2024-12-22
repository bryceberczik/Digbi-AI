import axios from "axios";

export const removeFile = async (fileId: string) => {
  try {
    await axios.delete(`https://digbiai.com/remove/${fileId}`);
  } catch (error) {
    console.error("Error removing JSON file:", error);
  }
};
