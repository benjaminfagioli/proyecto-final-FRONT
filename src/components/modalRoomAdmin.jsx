import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { crearRoom } from "../utils/agregarRoom.js";
import validateImages from "../validators/validateImages.js";
import existsNumberRoom from "../validators/existisNumberRoom.js";
import Swal from "sweetalert2";
import ImageComponent from "./ImageComponent.jsx";
import imagePlaceholder from "../../src/assets/placeholder-image.jpg";

const ModalRoomAdmin = ({ show, handleClose, updatePageHandler }) => {
  const [number, setNumber] = useState("");
  const [stars, setStars] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [imageURLs, setImageURLs] = useState({});
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [m2, setM2] = useState("");
  const [floor, setFloor] = useState("");
  const [wifi, setWifi] = useState(false);
  const [airConditional, setAirConditional] = useState(false);

  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length < 10 || description.length > 800) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "La descripción debe tener entre 10 y 800 caracteres.",
      });
      return;
    }

    try {
      const parsedPrice = parseInt(price);
      if (parsedPrice < 30000 || parsedPrice > 500000) {
        throw new Error("El precio debe estar entre $30,000 y $500,000.");
      }
    } catch (error) {
      console.error("Error de validación de precio:", error);
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: error.message,
      });
      return;
    }

    try {
      validateImages(imageURLs);
    } catch (error) {
      console.error("Error validating images:", error);
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "La URL de la imagen no es válida.",
      });
      return;
    }

    try {
      const roomExists = await existsNumberRoom(number);
      if (roomExists) {
        Swal.fire({
          icon: "error",
          title: "Error al crear la habitación",
          text: `Ya existe una habitación con el número ${number}.`,
        });
        return;
      }
    } catch (error) {
      console.error(
        "Error al verificar la existencia de la habitación:",
        error
      );
      Swal.fire({
        icon: "error",
        title: "Error al verificar la existencia de la habitación",
        text: "Ocurrió un error al verificar si la habitación ya existe. Por favor, inténtalo de nuevo más tarde.",
      });
      return;
    }

    const newRoom = {
      number: parseInt(number),
      stars: parseInt(stars),
      description,
      isVisible,
      images: Object.values(imageURLs),
      properties: {
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        m2: parseInt(m2),
        floor: parseInt(floor),
        wifi,
        airConditional,
      },
      price: parseInt(price),
      reserves: [],
    };
    try {
      await crearRoom(newRoom);
      updatePageHandler((prevState) => !prevState);
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Habitación creada",
        text: "La habitación se ha creado exitosamente.",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire({
          icon: "error",
          title: "Error al crear la habitación",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al crear la habitación",
          text: "Ha ocurrido un error al intentar crear la habitación. Por favor, inténtelo de nuevo más tarde.",
        });
      }
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
            <Form.Label>Tipo:</Form.Label>
            <select
              type="select"
              // defaultValue={"Basica / Media / Premium"}
              onChange={(e) => setStars(parseInt(e.target.value))}
              min="1"
              max="3"
              required
            >
              <option value="1">Basica</option>
              <option value="2">Media</option>
              <option value="3">Premium</option>
            </select>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="800"
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
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBathrooms">
            <Form.Label>Baños:</Form.Label>
            <Form.Control
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formM2">
            <Form.Label>Metros Cuadrados:</Form.Label>
            <Form.Control
              type="number"
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formFloor">
            <Form.Label>Piso:</Form.Label>
            <Form.Control
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              min="1"
              required
            />
          </Form.Group>
          <Form.Group controlId="formWifi">
            <Form.Check
              type="checkbox"
              label="WiFi"
              checked={wifi}
              onChange={(e) => setWifi(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formAirConditional">
            <Form.Check
              type="checkbox"
              label="Aire Acondicionado"
              checked={airConditional}
              onChange={(e) => setAirConditional(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Precio (Pesos):</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URLs de las Imágenes:</Form.Label>
            <Form.Control
              className="mb-1"
              type="text"
              id="imagen"
              autoComplete="off"
              placeholder="Imagen 1"
              defaultValue={imageURLs[0]}
              onChange={(e) => {
                if (imagen.value == "") {
                  delete imageURLs[0];
                  setImageURLs(imageURLs);
                } else {
                  setImageURLs({ ...imageURLs, 0: imagen.value });
                }
              }}
              pattern="https?://.+"
              title="Por favor ingrese URLs válidas que comiencen con http:// o https://"
              required
            />
            {Object.values(imageURLs).map((e, i) => (
              <>
                <ImageComponent
                  key={i}
                  src={imageURLs[i]}
                  notFoundSrc={imagePlaceholder}
                />
                <Form.Control
                  key={i + 1000}
                  className="mb-1"
                  type="text"
                  placeholder={`Imagen ${i + 2}`}
                  autoComplete="off"
                  id={`imagen${i + 1}`}
                  defaultValue={imageURLs[i + 1]}
                  onChange={(e) => {
                    let myNumber = parseInt(i + 1);
                    console.log(imageURLs);
                    if (
                      document.getElementById(`imagen${myNumber}`).value === ""
                    ) {
                      delete imageURLs[myNumber];
                      setImageURLs(imageURLs);
                    } else {
                      setImageURLs({
                        ...imageURLs,
                        [myNumber]: document.getElementById(`imagen${myNumber}`)
                          .value,
                      });
                    }
                  }}
                  pattern="https?://.+"
                  title="Por favor ingrese URLs válidas que comiencen con http:// o https://"
                />
              </>
            ))}
            {}
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
