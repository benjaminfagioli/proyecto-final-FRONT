import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

const existsNumberRoom = async (number) => {
  try {
    const response = await axios.get(`${URL_BASE}/rooms/getbynumber/${number}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error al verificar la existencia de la habitación:", error);
    return false;
  }
};

export default existsNumberRoom;
