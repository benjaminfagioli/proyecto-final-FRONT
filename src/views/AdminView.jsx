import React, { useState, useEffect } from "react";
import getAllRooms from "../utils/getAllRooms.js";
import getAllUsers from "../utils/getAllUsers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { eliminarRoomById } from "../utils/eliminarRooms.js";
import Swal from "sweetalert2";
import "../styles/admin.css";
import { crearRoom } from "../utils/agregarRoom.js";
import ModalRoomAdmin from "../components/modalRoomAdmin.jsx";
import Bb8Toggle from "../components/switchAdmin.jsx";
import CreateUserModal from "../components/modalUsersAdmin.jsx";
import eliminarUsuario from "../utils/eliminarUsuario.js";
import registerUser from "../utils/registerUsers.js";
import updateUserStatus from "../utils/editUserStatus.js";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import RoomEditModal from "../components/RoomEditModal.jsx";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUsersTab, setShowUsersTab] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await getAllRooms();
        setRooms(roomsData);

        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const confirmarEliminarRoom = async (roomId, event) => {
    event.stopPropagation(); // Detener la propagación del evento

    const confirmed = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la habitación permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed.isConfirmed) {
      eliminarRoom(roomId);
    }
  };

  const eliminarRoom = async (roomId) => {
    try {
      await eliminarRoomById(roomId);
      const updatedRooms = rooms.filter((room) => room._id !== roomId);
      setRooms(updatedRooms);
      await Swal.fire(
        "¡Eliminada!",
        "La habitación ha sido eliminada correctamente",
        "success"
      );
    } catch (error) {
      console.error("Error deleting room:", error);
      Swal.fire(
        "Error",
        "Hubo un error al eliminar la habitación. Por favor, inténtalo de nuevo más tarde",
        "error"
      );
    }
  };

  const guardarHabitacion = async (newRoomData) => {
    try {
      await crearRoom(newRoomData);
      setShowModal(false);
      const updatedRooms = await getAllRooms();
      setRooms(updatedRooms);
      const updatedRoomsData = await getAllRooms();
      setRooms(updatedRoomsData);
      setNewRoomData({});
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const confirmarEliminarUsuario = async (userId) => {
    const confirmed = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed.isConfirmed) {
      try {
        await eliminarUsuario(userId);
        await Swal.fire({
          icon: "success",
          title: "¡Usuario eliminado!",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    }
  };

  const toggleHabilitadoUsuario = async (userId, enabled) => {
    try {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, enabled } : user
      );
      setUsers(updatedUsers);
      await updateUserStatus(userId, enabled);
      await Swal.fire({
        icon: "success",
        title: "¡Estado de usuario actualizado!",
        text: "El estado del usuario ha sido actualizado correctamente",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el estado del usuario. Por favor, inténtalo de nuevo más tarde.",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="admin-container">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="admin-buttons">
              <Bb8Toggle
                checked={!showUsersTab}
                onChange={() => setShowUsersTab(!showUsersTab)}
              />
              <label className="toggle-label">
                <FontAwesomeIcon
                  icon={showUsersTab ? faAngleRight : faAngleLeft}
                />
                {showUsersTab ? "Cambiar tablero " : "Cambiar tablero "}
              </label>
            </div>
          </Col>
        </Row>

        {!showUsersTab && (
          <Row>
            <Col xs={12}>
              <div className="admin-table">
                <h2>Habitaciones</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Estrellas</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, index) => (
                      <tr key={index} onClick={() => handleSelectRoom(room)}>
                        <td>{room.number}</td>
                        <td>{room.stars}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="admin-icon"
                            onClick={() => setShowEditModal(true)}
                          />
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="admin-icon"
                            onClick={(e) => confirmarEliminarRoom(room._id, e)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button
                  onClick={() => setShowModal(true)}
                  className="create-button"
                >
                  Crear Habitación
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {showUsersTab && (
          <Row>
            <Col xs={12}>
              <div className="admin-table">
                <h2>Usuarios</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Eliminar</th>
                      <th>Habilitado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(
                      (user, index) =>
                        user.email !== "Admin@gmail.com" && (
                          <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            {user.email !== "Admin@gmail.com" && (
                              <>
                                <td>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="admin-icon"
                                    onClick={() =>
                                      confirmarEliminarUsuario(user._id)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={user.isActive}
                                    onChange={() =>
                                      toggleHabilitadoUsuario(
                                        user._id,
                                        !user.isActive
                                      )
                                    }
                                  />
                                </td>
                              </>
                            )}
                          </tr>
                        )
                    )}
                  </tbody>
                </Table>
                <Button
                  onClick={() => setShowUserModal(true)}
                  className="create-button"
                >
                  Crear Usuario
                </Button>
              </div>
            </Col>
          </Row>
        )}

        <ModalRoomAdmin
          show={showModal}
          handleClose={() => setShowModal(false)}
          guardarHabitacion={guardarHabitacion}
        />

        <CreateUserModal
          show={showUserModal}
          handleClose={() => setShowUserModal(false)}
          createUser={registerUser}
        />

        <RoomEditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          selectedRoom={selectedRoom}
        />
      </Container>
    </div>
  );
};

export default AdminView;
