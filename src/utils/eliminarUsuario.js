import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

const eliminarUsuario = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${URL_BASE}/users/deleteUser/${userId}`,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    console.log(userId);
    return response;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

export default eliminarUsuario;
