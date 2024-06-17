import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../styles/register.css";
import registerUser from "../utils/registerUsers.js";
import Swal from "sweetalert2";
import { Container, Spinner } from "react-bootstrap";

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

    if (!userData.name || !userData.email || !userData.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos.",
      });
      return;
    }

    try {
      setisLoading(true);
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
        <form className="loginForm" onSubmit={isSubmit}>
          <h2 className="loginForm-title poppins-semibold">Regístrate</h2>
          <Form.Group className="input-container mb-3" controlId="name">
            <Form.Label className="mb-0 poppins-light">Nombre</Form.Label>
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
            <Form.Label className="mb-0 poppins-light">Email</Form.Label>
            <Form.Control
              name="email"
              autoComplete="off"
              placeholder="Ingresa tu correo electrónico"
              className="input"
              value={userData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="input-container mb-3" controlId="password">
            <Form.Label className="mb-0 poppins-light">Contraseña</Form.Label>
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
          <div className="text-center">
            <button
              variant="primary"
              type="submit"
              className="submit poppins-light"
              disabled={isLoading}
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
