import axios from "axios";

export const uploadFile = async (file: File, userId: string) => {
  try {
    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("userId", userId);
    
    await axios.post(`/file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading JSON file:", error);
  }
};
