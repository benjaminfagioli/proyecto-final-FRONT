import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

export const enviarCorreo = async (correoData) => {
  try {
    console.log(correoData);
    const response = await axios.post(
      `${URL_BASE}/ruta/del/backend`,
      correoData
    );
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo:", error.response);
    throw new Error(error.response.data.message || "Error al enviar el correo");
  }
};
