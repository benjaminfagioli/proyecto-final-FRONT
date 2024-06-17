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
import deleteAllReserves from "../utils/deleteAllReserves.js";
import { ADMIN_KEY } from "../config/config.js";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUsersTab, setShowUsersTab] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const authToken = localStorage.getItem("token-Auth");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = await getAllRooms();
        const usersData = await getAllUsers();
        if (
          roomsData?.response?.status === 403 ||
          usersData?.response?.status === 403
        )
          Swal.fire({
            title: "No tienes permiso de administrador",
            icon: "warning",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) navigate("/");
          });
        setRooms(roomsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updatePage]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const confirmarEliminarRoom = async (roomId, event) => {
    event.stopPropagation();
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
      setUpdatePage((prevState) => !prevState);
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
      await Swal.fire(
        "¡Habitación creada!",
        "La habitación ha sido creada correctamente",
        "success"
      );
      setUpdatePage((prevState) => !prevState);
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
        const authToken = localStorage.getItem("token");
        await deleteAllReserves(userId, authToken);
        //await eliminarUsuario(userId);
        await Swal.fire({
          icon: "success",
          title:
            "¡Usuario eliminado! Se han eliminado también sus reservaciones.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        setUpdatePage((prevState) => !prevState);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
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
    const message = !enabled
      ? "El estado del usuario se ha deshabilitado. ¿Desea tambien eliminar sus reservaciones?"
      : "El usuario ahora está activo";
    try {
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, enabled } : user
      );
      setUsers(updatedUsers);
      await updateUserStatus(userId, enabled);
      await Swal.fire({
        icon: "success",
        title: "¡Estado de usuario actualizado!",
        text: message,
        showConfirmButton: !enabled ? true : false,
        showCancelButton: !enabled ? true : false,
        confirmButtonColor: "#ab8171",
        cancelButtonColor: "#eacbb9",
        cancelButtonText: "Por ahora no",
        confirmButtonText: "OK",
      })
        .then((result) => {
          if (result.isConfirmed)
            deleteAllReserves(userId, localStorage.getItem("token"));
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            text: error.message,
            showConfirmButton: true,
            confirmButtonText: "OK",
          })
        );
      setUpdatePage((prevState) => !prevState);
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
    <>
      {authToken === ADMIN_KEY ? (
        <div className="admin-container py-4">
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

            {!showUsersTab && Array.isArray(rooms) && (
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
                          <tr
                            key={index}
                            onClick={() => handleSelectRoom(room)}
                          >
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
                                onClick={(e) =>
                                  confirmarEliminarRoom(room._id, e)
                                }
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

            {showUsersTab && Array.isArray(users) && (
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
              updatePageHandler={setUpdatePage}
              guardarHabitacion={guardarHabitacion}
            />

            <CreateUserModal
              show={showUserModal}
              handleClose={() => setShowUserModal(false)}
              createUser={registerUser}
              updatePageHandler={setUpdatePage}
            />

            <RoomEditModal
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              selectedRoom={selectedRoom}
              updatePageHandler={setUpdatePage}
            />
          </Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminView;
