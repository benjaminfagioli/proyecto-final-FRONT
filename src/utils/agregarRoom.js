import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const crearRoom = async (roomData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${URL_BASE}/rooms/createroom`,
      roomData,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error.response.data); // Imprime el mensaje de error devuelto por Axios
    throw new Error(error.response.data.message || "Error creating room"); // Lanza un nuevo error con el mensaje de error devuelto por Axios
  }
};
