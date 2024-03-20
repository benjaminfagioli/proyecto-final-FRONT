import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { passwordRegex } from "../validators/regexPassword";
import getAllUsers from "../utils/getAllUsers";

const CreateUserModal = ({
  show,
  handleClose,
  createUser,
  updatePageHandler,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const isEmailValid = async (email) => {
    const users = await getAllUsers();
    return !users.find((user) => user.email === email);
  };

  const isPasswordValid = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await isEmailValid(email))) {
      Swal.fire({
        icon: "error",
        title: "Correo electrónico ya registrado",
        text: "El correo electrónico ingresado ya está asociado a una cuenta existente.",
      });
      return;
    }

    if (!isPasswordValid(password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener entre 8 y 30 caracteres y contener al menos una letra y un número.",
      });
      return;
    }

    const newUser = {
      name,
      email,
      password,
      isActive,
    };

    try {
      await createUser(newUser);
      handleClose();
      updatePageHandler((prevState) => !prevState);
      Swal.fire({
        icon: "success",
        title: "Usuario creado",
        text: "El usuario se ha creado exitosamente.",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire({
          icon: "error",
          title: "Error al crear usuario",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear usuario",
          text: "Ha ocurrido un error al intentar crear el usuario. Por favor, inténtelo de nuevo más tarde.",
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formIsActive">
            <Form.Check
              type="checkbox"
              label="Activo"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
