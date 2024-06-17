import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "../styles/contact.css";
import { obtenerToken } from "../utils/obtenerToken.js";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";

const ContactoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const usuario = obtenerToken();
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isSubmit = (data) => {
    console.log(data);
    const { asunto, message } = data;
    if (!nombre || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, debes iniciar sesión para contactarte.",
      });
      return;
    }

    if (!asunto || !mensaje) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }
    setIsLoading(true);
    const templateParams = {
      from_name: nombre,
      to_name: "Admin",
      asunto: asunto,
      message: message,
    };

    emailjs
      .send(
        "service_e4bptqv",
        "template_njo2c9p",
        templateParams,
        "R57eWNNzjw06V4OeZ"
      )
      .then(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "¡Mensaje enviado!",
            text: "Gracias por contactarnos.",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/";
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.",
          });
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <div className="d-flex justify-content-center py-5">
        <Form onSubmit={handleSubmit(isSubmit)} className="contactForm">
          <h2 className="loginForm-title">Formulario de Contacto</h2>
          <Form.Group controlId="formNombre" className="input-container">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="input-container">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formAsunto" className="input-container">
            <Form.Label>Asunto</Form.Label>
            <Form.Control
              {...register("asunto", {
                required: {
                  value: true,
                  message: "El asunto es obligatorio",
                },
                minLength: {
                  value: 4,
                  message: "Ingrese como mínimo 4 caracteres",
                },
              })}
              type="text"
              autoComplete="off"
              placeholder="Ingresa el asunto"

              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              maxLength={30}

            />
            {errors?.asunto?.message && (
              <div className="fadein d-flex align-items-center text-danger flex-wrap w-100">
                <i className="bi fs-5 bi-exclamation-lg"></i>
                <span>{errors?.asunto?.message}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="formMensaje" className="input-container">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              {...register("message", {
                required: {
                  value: true,
                  message: "Debe ingresar un mensaje",
                },
                minLength: {
                  value: 10,
                  message: "Ingrese como mínimo 10 caracteres",
                },
                maxLength: {
                  value: 400,
                  message: "Ingrese como máximo 400 caracteres",
                },
              })}
              as="textarea"
              rows={4}

              placeholder="Escribe tu mensaje aquí"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength={300}

            />
            {errors?.message?.message && (
              <div className="fadein d-flex align-items-center text-danger">
                <i className="bi fs-5 bi-exclamation-lg"></i>
                <span>{errors?.message?.message}</span>
              </div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="submit">
            {isLoading ? <Spinner size="sm" /> : "Enviar"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ContactoForm;
