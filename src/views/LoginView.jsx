import React, { useState } from "react";
import "../styles/loginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { ADMIN_KEY, URL_BASE, USER_KEY } from "../config/config";
import Swal from "sweetalert2";

const LoginView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      setisLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${URL_BASE}/users/login`, {
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Has iniciado sesión correctamente.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        let fixedToken = res.data.key === ADMIN_KEY ? ADMIN_KEY : USER_KEY;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("token-Auth", fixedToken);

        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Contraseña y/o usuario incorrecto.",
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center py-5">
          <form className="loginForm" onSubmit={onSubmit}>
            <h2 className="loginForm-title poppins-semibold">
              Ingresa a tu cuenta
            </h2>
            <div className="input-container">

              <Form.Label className="mb-0 poppins-light">Email</Form.Label>
              <Form.Control
                name="email"
                type="text"
                autoComplete="off"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="input-container">

              <Form.Label className="mb-0 poppins-light">Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
            <button type="submit" className="submit poppins-light">
              {isLoading ? <Spinner size="sm" /> : "Ingresar"}
            </button>

            <p className="signup-link mt-3 mb-2 poppins-light">

              ¿No tienes una cuenta?
              <Link className="ms-1 text-decoration-none" to={"/register"}>
                Regístrate

              </Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LoginView;
