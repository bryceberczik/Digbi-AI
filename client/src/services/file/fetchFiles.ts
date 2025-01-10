import axios from "axios";

export const fetchFiles = async (userId: string) => {
  try {
    const response = await axios.get(`/file/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};

export const fetchAllFiles = async () => {
  try {
    const response = await axios.get(`/file`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all JSON files:", error);
  }
};
