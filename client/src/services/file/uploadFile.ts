// import axios from "axios";

// export const uploadFile = async (file: File, userId: string) => {
//   try {
//     const formData = new FormData();
    
//     formData.append("file", file);
//     formData.append("userId", userId);
    
//     await axios.post(`/file/upload`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   } catch (error) {
//     console.error("Error uploading JSON file:", error);
//   }
// };


import axios from "axios";

export const uploadFile = async (file: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const response = await axios.post(`/file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading JSON file:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Non-Axios error:", error);
    }
  }
};
