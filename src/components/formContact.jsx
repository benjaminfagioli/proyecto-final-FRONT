import React, { useState, useEffect } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "../styles/contact.css";
import { obtenerToken } from "../utils/obtenerToken.js";
import emailjs from "emailjs-com";

const ContactoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const usuario = obtenerToken();
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

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
      message: mensaje,
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
          setIsLoading(false);
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
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.",
          });
        }
      );
  };

  return (
    <Container>
      <div className="d-flex justify-content-center py-5">
        <Form onSubmit={onSubmit} className="contactForm">
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
              type="text"
              autoComplete="off"
              placeholder="Ingresa el asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              maxLength={30}
            />
          </Form.Group>

          <Form.Group controlId="formMensaje" className="input-container">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              rows={4}
              placeholder="Escribe tu mensaje aquí"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength={300}
            />
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
