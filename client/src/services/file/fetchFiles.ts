import axios from "axios";

// Get rid of 'http://localhost:3001' part. Leave the first slash like in routes.

export const fetchFiles = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/file/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};

export const fetchAllFiles = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/file`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all JSON files:", error);
  }
};
