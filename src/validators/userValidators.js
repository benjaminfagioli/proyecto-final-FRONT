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
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
      "Ingresa una contraseña con mínimo de 8 caracteres, máximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales."
    )
    .required("Ingresa una contraseña"),
});

export const validateFormData = async (userData) => {
  try {
    await validationUserCreate.validate(userData);
    return { isValid: true };
  } catch (error) {
    return { isValid: false };
  }
};

export default validateFormData;
