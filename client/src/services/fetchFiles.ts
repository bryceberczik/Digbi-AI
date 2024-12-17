import axios from "axios";

export const fetchFiles = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3001/file`
    );

    console.log("JSON Files:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};
