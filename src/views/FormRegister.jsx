import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/register.css";
import registerUser from "../utils/registerUsers.js";
import Swal from "sweetalert2";
import { validateFormData } from "../validators/userValidators.js";
import { Container } from "react-bootstrap";

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
        text: "El usuario se ha registrado correctamente.",
        showConfirmButton: false,
        timer: 3000,
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
    }
  };
  return (
    <Container>
      <div className="d-flex justify-content-center py-5">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2 className="loginForm-title">Regístrate</h2>
          <Form.Group className="input-container mb-3" controlId="name">
            <Form.Label className="mb-0">Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Ingresa tu nombre"
              className="input"
              value={userData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="input-container mb-3" controlId="email">
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Ingresa tu correo electrónico"
              className="input"
              value={userData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="input-container mb-3" controlId="password">
            <Form.Label className="mb-0">Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Ingresa tu contraseña"
              className="input"
              value={userData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="">
            <button variant="primary" type="submit" className="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default FormRegister;
