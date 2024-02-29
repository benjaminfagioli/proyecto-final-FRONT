import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const getASingleRoom = async (numberRoom, set) => {
  try {
    const data = await fetch(`${URL_BASE}/rooms/getByNumber/${numberRoom}`);
    if (data.status == 404) return console.log("no se encontró la habitacion");
    const result = await data.json();
    if (!set) return result;
    set(result);
  } catch (error) {
    console.log(error.message);
  }
};
export default getASingleRoom;
