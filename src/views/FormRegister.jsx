import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/register.css";
import registerUser from "../utils/registerUsers.js";
import Swal from "sweetalert2";
import { validateFormData } from "../validators/userValidators.js";
import { Container, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

function FormRegister() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors.password);
  const isSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    try {
      setisLoading(true);
      const { isValid, errorMessage } = await validateFormData(userData);

      if (!isValid) {
        Swal.fire({
          icon: "error",
          title: "Error",
          html: errorMessage,
        });
        return;
      }

      const response = await registerUser(userData);

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El usuario se ha registrado correctamente y ha iniciado sesión.",
        showConfirmButton: false,
        timer: 4500,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center py-5">
        <form className="loginForm" onSubmit={handleSubmit(isSubmit)}>
          <h2 className="loginForm-title poppins-semibold">Regístrate</h2>
          <Form.Group className="input-container mb-3" controlId="name">
            <Form.Label className="mb-0 poppins-light">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Ingresa tu nombre"
              className="input"
              max={30}
              {...register("name", {
                required: {
                  value: true,
                  message: "Debes ingresar un nombre",
                },
              })}
            />
            {/* Feedback Name */}
            <div
              className={`d-flex align-items-center text-danger flex-wrap w-100 feedbackForm ${
                errors.name?.message ? "fadein" : ""
              }`}
            >
              <i className="bi fs-5 bi-exclamation-lg"></i>
              <span>{errors?.name?.message}</span>
            </div>
          </Form.Group>
          <Form.Group className="input-container mb-3" controlId="email">
            <Form.Label className="mb-0 poppins-light">Email</Form.Label>
            <Form.Control
              name="email"
              autoComplete="off"
              placeholder="Ingresa tu correo electrónico"
              className="input"
              {...register("email", {
                required: {
                  value: true,
                  message: "Debes ingresar un correo",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Debe tener un formato de email",
                },
              })}
            />
            {/* Feedback Email */}
            <div
              className={`d-flex align-items-center text-danger flex-wrap w-100 feedbackForm ${
                errors.email?.message ? "fadein" : ""
              }`}
            >
              <i className="bi fs-5 bi-exclamation-lg"></i>
              <span>{errors?.email?.message}</span>
            </div>
          </Form.Group>
          <Form.Group className="input-container mb-3" controlId="password">
            <Form.Label className="mb-0 poppins-light">Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Ingresa tu contraseña"
              className="input"
              {...register("password", {
                required: {
                  value: true,
                  message: "Debes ingresar una contraseña",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
                  message:
                    "La contraseña debe tener mínimo de 8 caracteres, máximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales.",
                },
              })}
            />
            {/* Feedback Password */}
            <div
              className={`d-flex align-items-center text-danger w-100 feedbackForm ${
                errors.password?.type === "required" ? "fadein" : ""
              }
              ${errors.password?.type === "pattern" ? "passwFF" : ""}
              `}
            >
              <i className="bi fs-5 bi-exclamation-lg"></i>
              <span>{errors?.password?.message}</span>
            </div>
          </Form.Group>
          <Form.Group
            className="input-container mb-3"
            controlId="confirmPassword"
          >
            <Form.Label className="mb-0 poppins-light">
              Confirmar Contraseña
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirma tu contraseña"
              className="input"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="">
            <button
              variant="primary"
              type="submit"
              className="submit poppins-light"
            >
              {isLoading ? <Spinner size="sm" /> : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormRegister;
