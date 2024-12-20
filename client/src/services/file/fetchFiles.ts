import axios from "axios";

export const fetchFiles = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/file/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};
