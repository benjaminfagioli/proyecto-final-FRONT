import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const eliminarRoomById = async (roomId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    const response = await axios.delete(
      `${URL_BASE}/rooms/deleteroom/${roomId}`,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Error deleting room");
  }
};
