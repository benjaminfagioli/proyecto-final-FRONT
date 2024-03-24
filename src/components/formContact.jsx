import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../styles/contact.css";
import { obtenerToken } from "../utils/obtenerToken.js";
import emailjs from "emailjs-com";

const ContactoForm = () => {
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const usuario = obtenerToken();
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre || !email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, debes estar logeado para contactarte.",
      });
      return;
    }

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
          Swal.fire({
            icon: "success",
            title: "¡Mensaje enviado!",
            text: "Gracias por contactarnos.",
            timer: 300000000,
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
      );

    setAsunto("");
    setMensaje("");
  };

  return (
    <Container>
      <div className="d-flex justify-content-center py-5">
        <Form onSubmit={handleSubmit} className="contactForm">
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
              placeholder="Ingresa el asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMensaje" className="input-container">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Escribe tu mensaje aquí"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ContactoForm;
