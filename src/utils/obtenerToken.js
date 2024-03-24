import { jwtDecode } from "jwt-decode";

export const obtenerToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        const { name, email } = decodedToken;
        return { nombre: name, email };
      } else {
        console.error("Error al decodificar el token");
        return null;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  } else {
    console.warn("No se encontró ningún token en el localStorage");
    return null;
  }
};
