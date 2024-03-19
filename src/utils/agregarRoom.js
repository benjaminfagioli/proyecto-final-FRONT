import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const crearRoom = async (roomData) => {
  try {
    console.log(roomData);
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const response = await axios.post(
      `${URL_BASE}/rooms/createroom`,
      roomData,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error.response);
    throw new Error(error.response.data.message || "Error creating room");
  }
};
