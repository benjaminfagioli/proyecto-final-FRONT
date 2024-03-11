import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${URL_BASE}/users/allUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getAllUsers;
