import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const getAllRooms = async (set) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL_BASE}/rooms/allrooms`, {
      headers: {
        "auth-token": token,
      },
    });
    if (!set) return response.data;
    set(response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getAllRooms;
