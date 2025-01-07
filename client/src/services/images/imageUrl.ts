import axios from "axios";

export const uploadImage = async (image: File, email: string) => {
  try {
    const data = new FormData();
    data.append("image", image);
    data.append("email", email);

    console.log(data.get("image"));
    console.log(data.get(email));

    await axios.post(`http://localhost:3001/image/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);

    if (axios.isAxiosError(error)) {
      console.error("Axios Error Details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error("Non-Axios Error:", error);
    }
  }
};
