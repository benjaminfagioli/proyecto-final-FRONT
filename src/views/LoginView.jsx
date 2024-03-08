import React, { useRef } from "react";
import "../styles/loginForm.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import regexEmail from "../utils/regexEmail";
import { useState } from "react";

const LoginView = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target.form));
    const { email, password } = formData;
    console.log(formData);
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center py-5">
          <form className="loginForm">
            <p className="loginForm-title">Ingresa a tu cuenta</p>
            <div className="input-container">
              <input
                name="email"
                type="email"
                placeholder="Ingresa tu email "
              />
            </div>
            <div className="input-container">
              <input
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button onClick={handleClick} className="submit">
              Ingresar
            </button>

            <p className="signup-link mt-2">
              No tienes una cuenta?
              <Link className="ms-1 text-decoration-none" to={"/register"}>
                Registrate
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LoginView;
