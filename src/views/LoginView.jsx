import React, { useRef, useState } from "react";
import "../styles/loginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import regexEmail from "../utils/regexEmail";
import axios from "axios";
import { URL_BASE } from "../config/config";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const LoginView = () => {
  const [isLoading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setisLoading(true);
    const { email, password } = data;
    try {
      const res = await axios.post(`${URL_BASE}/users/login`, data);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Te has logueado correctamente.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      });
    } catch (error) {
      const myErrors = [];

      error.response.data.errors.forEach((e) => myErrors.push(e.msg));
      Swal.fire({
        icon: "error",
        title: "Error",
        html: myErrors.length > 0 && myErrors.join("<br>"),
      });
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <Container>
        <div className="d-flex justify-content-center py-5">
          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <p className="loginForm-title">Ingresa a tu cuenta</p>
            <div className="input-container">
              <input
                name="email"
                type="text"
                placeholder="Ingresa tu email "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Debes ingresar un correo",
                  },
                  pattern: {
                    value: regexEmail,
                    message: "Debe tener un formato de correo",
                  },
                })}
              />
              {errors?.email?.message && (
                <div className="d-flex align-items-center text-danger">
                  <i className="bi fs-5 bi-exclamation-lg"></i>
                  <span>{errors?.email?.message}</span>
                </div>
              )}
            </div>
            <div className="input-container">
              <input
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Debes ingresar una contraseña",
                  },
                  minLength: {
                    value: 8,
                    message: "Ingresa al menos 8 caracteres",
                  },
                })}
              />
              {errors?.password?.message && (
                <div className="d-flex align-items-center text-danger">
                  <i className="bi fs-5 bi-exclamation-lg"></i>
                  <span>{errors?.password?.message}</span>
                </div>
              )}
            </div>
            <button type="submit" className="submit">
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
      {isLoading && <Loader />}
    </>
  );
};

export default LoginView;
