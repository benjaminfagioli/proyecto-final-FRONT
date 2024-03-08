import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL_BASE}/users/createUser`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};

export default registerUser;
