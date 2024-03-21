import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import editRoom from "../utils/editRoom";

const RoomEditModal = ({
  show,
  handleClose,
  selectedRoom,
  updatePageHandler,
}) => {
  const [editedRoom, setEditedRoom] = useState({
    number: "",
    stars: "",
    description: "",
    isVisible: false,
    images: [],
    properties: {
      bedrooms: 0,
      bathrooms: 0,
      m2: 0,
      floor: 0,
      wifi: false,
      airConditional: false,
    },
  });
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    setImageURLs({});
  }, [handleClose]);

  useEffect(() => {
    if (!Object.values(imageURLs).length)
      for (let index = 0; index < selectedRoom?.images?.length; index++) {
        const element = selectedRoom.images[index];
        setImageURLs((prev) => ({ ...prev, [index]: element }));
      }
  }, [show]);

  useEffect(() => {
    console.log("se cambio de habitacion");
    if (selectedRoom) {
      setEditedRoom(selectedRoom);
      for (let index = 0; index < selectedRoom.images.length; index++) {
        const element = selectedRoom.images[index];
        setImageURLs((prev) => ({ ...prev, [index]: element }));
      }
    }
  }, [selectedRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setEditedRoom((prev) => ({ ...prev, images: Object.values(imageURLs) }));
    // console.log(editedRoom);
    try {
      await editRoom(editedRoom._id, {
        ...editedRoom,
        images: Object.values(imageURLs),
      });
      handleClose();
      updatePageHandler((prevState) => !prevState);
      Swal.fire({
        icon: "success",
        title: "Habitación actualizada",
        text: "Los cambios han sido guardados exitosamente.",
      });
    } catch (error) {
      console.error("Error al editar la habitación:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al editar la habitación. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Habitación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNumber">
            <Form.Label>Número:</Form.Label>
            <Form.Control
              type="text"
              value={editedRoom.number}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, number: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formStars">
            <Form.Label>Estrellas:</Form.Label>
            <Form.Control
              type="number"
              value={editedRoom.stars}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, stars: e.target.value })
              }
              min="1"
              max="3"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={editedRoom.description}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, description: e.target.value })
              }
              maxLength="800"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Imágenes:</Form.Label>
            <Form.Control
              type="text"
              id="imagen"
              autoComplete="off"
              defaultValue={imageURLs[0]}
              onChange={() => {
                setImageURLs((prev) => ({
                  ...prev,
                  0: imagen.value,
                }));
                console.log(imageURLs);
              }}
              required
            />

            {Object.values(imageURLs).map((e, i) => {
              return (
                <Form.Control
                  className="mb-1"
                  type="text"
                  placeholder={`Imagen ${i + 2}`}
                  autoComplete="off"
                  id={`imagen${i + 1}`}
                  defaultValue={imageURLs[i + 1]}
                  onChange={() => {
                    let myNumber = parseInt(i + 1);
                    if (
                      document.getElementById(`imagen${myNumber}`).value === ""
                    ) {
                      delete imageURLs[myNumber];
                      setImageURLs(imageURLs);
                    } else {
                      setImageURLs((prev) => ({
                        ...prev,
                        [myNumber]: document.getElementById(`imagen${myNumber}`)
                          .value,
                      }));
                    }
                  }}
                  pattern="https?://.+"
                  title="Por favor ingrese URLs válidas que comiencen con http:// o https://"
                />
              );
            })}
          </Form.Group>
          <Form.Group controlId="formIsVisible">
            <Form.Check
              type="checkbox"
              label="Visible"
              checked={editedRoom.isVisible}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, isVisible: e.target.checked })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBedrooms">
            <Form.Label>Habitaciones:</Form.Label>
            <Form.Control
              type="number"
              value={editedRoom.properties.bedrooms}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    bedrooms: parseInt(e.target.value),
                  },
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formBathrooms">
            <Form.Label>Baños:</Form.Label>
            <Form.Control
              type="number"
              value={editedRoom.properties.bathrooms}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    bathrooms: parseInt(e.target.value),
                  },
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formM2">
            <Form.Label>m²:</Form.Label>
            <Form.Control
              type="number"
              value={editedRoom.properties.m2}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    m2: parseInt(e.target.value),
                  },
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formFloor">
            <Form.Label>Piso:</Form.Label>
            <Form.Control
              type="number"
              value={editedRoom.properties.floor}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    floor: parseInt(e.target.value),
                  },
                })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formWifi">
            <Form.Check
              type="checkbox"
              label="Wifi"
              checked={editedRoom.properties.wifi}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    wifi: e.target.checked,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAirConditional">
            <Form.Check
              type="checkbox"
              label="Aire Acondicionado"
              checked={editedRoom.properties.airConditional}
              onChange={(e) =>
                setEditedRoom({
                  ...editedRoom,
                  properties: {
                    ...editedRoom.properties,
                    airConditional: e.target.checked,
                  },
                })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RoomEditModal;
