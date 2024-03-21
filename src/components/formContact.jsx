import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/contact.css";
import { obtenerToken } from "../utils/obtenerToken.js";

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
    console.log("Asunto:", asunto);
    console.log("Mensaje:", mensaje);
  };

  return (
    <Container>
      <div className="loginForm contactForm">
        {" "}
        <h2 className="loginForm-title">Formulario de Contacto</h2>{" "}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre" className="input-container">
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="input-container">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formAsunto" className="input-container">
            <Form.Control
              type="text"
              placeholder="Asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMensaje" className="input-container">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Mensaje"
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
