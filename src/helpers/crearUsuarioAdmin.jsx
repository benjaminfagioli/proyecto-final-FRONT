import registerUser from "../utils/registerUsers";

export const crearUsuario = async (userData) => {
  try {
    const responseData = await registerUser(userData);
    return responseData;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage);
    } else {
      throw new Error(
        "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }
};
