import axios from "axios";

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/users/${id}`
    );
    console.log("yay it worked:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("Error deleting user", err);
  }
};
