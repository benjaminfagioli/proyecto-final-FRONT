import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/register.css";
import registerUser from "../utils/registerUsers.js";
import Swal from "sweetalert2";
import { validateFormData } from "../validators/userValidators.js";

function FormRegister() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validation = await validateFormData(userData);
      if (!validation.isValid) {
        let errorMessage =
          "Por favor completa todos los campos y sigue los siguientes requisitos para la contraseña:<br>";
        errorMessage +=
          "- La contraseña debe tener mínimo 8 caracteres y máximo 30.<br>";
        errorMessage +=
          "- Debe contener al menos una letra y un número. No se permiten espacios ni caracteres especiales.<br>";
        Swal.fire({
          icon: "error",
          title: "Error",
          html: errorMessage,
        });
        return;
      }
      const response = await registerUser(userData);
      console.log("User creado :", response);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El usuario se ha registrado correctamente.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error creando el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <Form className="login-box" onSubmit={handleSubmit}>
      <h2>Regístrate</h2>
      <Form.Group className="user-box mb-3" controlId="name">
        <Form.Control
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          className="input"
          value={userData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="user-box mb-3" controlId="email">
        <Form.Control
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          className="input"
          value={userData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="user-box mb-3" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          className="input"
          value={userData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="styled-button-container">
        <Button variant="primary" type="submit" className="styled-button">
          Enviar
        </Button>
      </div>
    </Form>
  );
}

export default FormRegister;
