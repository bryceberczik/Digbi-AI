import axios from "axios";

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
  }
};
