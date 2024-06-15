import axios from "axios";
import { URL_BASE } from "../config/config";

const deleteAllReserves = async (id, token) => {
  try {
    const response = await axios.patch(
      `${URL_BASE}/deleteManyReserves/${id}`,
      null,
      {
        headers: {
          "auth-token": token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al eliminar reservas:", error);
    throw error;
  }
};

export default deleteAllReserves;
