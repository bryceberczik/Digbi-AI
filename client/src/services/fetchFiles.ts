import axios from "axios";

export const fetchFiles = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/file/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
};

export const uploadFile = async (file: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const response = await axios.post(
      `http://localhost:3001/file/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading JSON file:", error);
  }
};

export const removeFile = async (id: string) => {
  try {
    await axios.delete(`http://localhost:3001/file/remove/${id}`);
  } catch (error) {
    console.error("Error removing JSON file:", error);
  }
};
