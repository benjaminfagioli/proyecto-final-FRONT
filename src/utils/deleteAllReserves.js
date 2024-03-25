import axios from "axios";
import { URL_BASE } from "../config/config";

const deleteAllReserves = async (id, token) => {
  try {
    await axios.patch(`${URL_BASE}/rooms/deleteManyReserves/${id}`, null, {
      headers: {
        "auth-token": token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export default deleteAllReserves;
