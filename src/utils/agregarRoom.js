import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const crearRoom = async (roomData) => {
  try {
    const response = await axios.post(`${URL_BASE}/rooms/createroom`, roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Error creating room");
  }
};
