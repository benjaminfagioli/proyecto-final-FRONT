import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/register.css";
import registerUser from "../utils/registerUsers.js";
import { useNavigate } from "react-router-dom";

function FormRegister() {
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
      const response = await registerUser(userData);
      console.log("User creado :", response);
    } catch (error) {
      console.error("Error creando el usuario:", error);
    }
  };

  return (
    <Form className="login-box" onSubmit={handleSubmit}>
      <h2>Registrate</h2>
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
          placeholder="Enter email"
          className="input"
          value={userData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="user-box mb-3" controlId="password">
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
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
