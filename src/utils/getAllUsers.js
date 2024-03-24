import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL_BASE}/users/allUsers`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default getAllUsers;
