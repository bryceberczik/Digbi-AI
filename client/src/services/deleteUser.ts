import axios from "axios";

export const deleteUser = async (id: string) => {
  try {

    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};
