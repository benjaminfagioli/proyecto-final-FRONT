import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { crearRoom } from "../utils/agregarRoom.js";

const ModalRoomAdmin = ({ show, handleClose }) => {
  const [number, setNumber] = useState("");
  const [stars, setStars] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [properties, setProperties] = useState({
    bedrooms: "",
    bathrooms: "",
    m2: "",
    floor: "",
    wifi: false,
    airConditional: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      number: parseInt(number),
      stars: parseInt(stars),
      description,
      isVisible,
      images: [imageURL],
      properties,
      reserves: [],
    };

    console.log("Nuevo room:", newRoom);

    try {
      await crearRoom(newRoom);
      handleClose();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Habitación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNumber">
            <Form.Label>Número:</Form.Label>
            <Form.Control
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formStars">
            <Form.Label>Estrellas:</Form.Label>
            <Form.Control
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              min="1"
              max="3"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="150"
              required
            />
          </Form.Group>
          <Form.Group controlId="formIsVisible">
            <Form.Check
              type="checkbox"
              label="Visible"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formBedrooms">
            <Form.Label>Dormitorios:</Form.Label>
            <Form.Control
              type="number"
              value={properties.bedrooms}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  bedrooms: parseInt(e.target.value),
                })
              }
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBathrooms">
            <Form.Label>Baños:</Form.Label>
            <Form.Control
              type="number"
              value={properties.bathrooms}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  bathrooms: parseInt(e.target.value),
                })
              }
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formM2">
            <Form.Label>Metros Cuadrados:</Form.Label>
            <Form.Control
              type="number"
              value={properties.m2}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  m2: parseInt(e.target.value),
                })
              }
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formFloor">
            <Form.Label>Piso:</Form.Label>
            <Form.Control
              type="number"
              value={properties.floor}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  floor: parseInt(e.target.value),
                })
              }
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formWifi">
            <Form.Check
              type="checkbox"
              label="WiFi"
              checked={properties.wifi}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  wifi: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAirConditional">
            <Form.Check
              type="checkbox"
              label="Aire Acondicionado"
              checked={properties.airConditional}
              onChange={(e) =>
                setProperties({
                  ...properties,
                  airConditional: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formImageURL">
            <Form.Label>URL de la Imagen:</Form.Label>
            <Form.Control
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              pattern="https?://.+"
              title="Por favor ingrese una URL válida que comience con http:// o https://"
              required
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

export default ModalRoomAdmin;
