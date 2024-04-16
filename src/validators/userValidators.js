import * as yup from "yup";

const validationUserCreate = yup.object().shape({
  name: yup.string().trim().required("Ingresa un nombre"),
  email: yup
    .string()
    .trim()
    .email("Ingresa un correo electronico valido")
    .required("Ingresa un correo electrónico"),
  password: yup
    .string()
    .trim()
    .required("La contraseña es obligatoria ")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
      "La contraseña debe tener mínimo de 8 caracteres, máximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales."
    ),
});

export const validateFormData = async (userData) => {
  try {
    await validationUserCreate.validate(userData, { abortEarly: false });
    return { isValid: true, errorMessage: null };
  } catch (error) {
    let errorMessage = "";

    error.inner.forEach((err) => {
      switch (err.path) {
        case "name":
          errorMessage += err.message + "<br>";
          break;
        case "email":
          errorMessage += err.message + "<br>";
          break;
        case "password":
          errorMessage += err.message + "<br>";
          break;
        default:
          break;
      }
    });

    if (!errorMessage) {
      errorMessage = "Por favor completa todos los campos.<br>";
    }

    return { isValid: false, errorMessage };
  }
};
