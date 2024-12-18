import axios from "axios";

export const fetchFiles = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/file`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};
