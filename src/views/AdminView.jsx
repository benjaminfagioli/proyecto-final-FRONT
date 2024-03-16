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

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRoomData, setNewRoomData] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUsersTab, setShowUsersTab] = useState(false);

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
  }, [users, rooms]);

  const toggleIsBusy = (roomId) => {
    console.log("cambiando estado isBusy de", roomId);
  };

  const editRoom = (roomId) => {
    console.log(`Editar habitación ${roomId}`);
  };

  const confirmarEliminarRoom = async (roomId) => {
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

  const guardarUsuario = async (userData) => {
    console.log("user creado");
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

  return (
    <div className="admin-container">
      <div className="admin-buttons">
        <Bb8Toggle
          checked={!showUsersTab}
          onChange={() => setShowUsersTab(!showUsersTab)}
        />
        <label>Mostrar {showUsersTab ? "Habitaciones" : "Usuarios"}</label>
      </div>

      {!showUsersTab && (
        <div className="admin-table">
          <h2>Habitaciones</h2>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Estrellas</th>
                <th>Visible</th>
                <th>Ocupada</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room.number}</td>
                  <td>{room.stars}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={room.isVisible}
                      onChange={() => {}}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={room.isBusy}
                      onChange={() => toggleIsBusy(room._id)}
                      disabled
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="admin-icon"
                      onClick={() => editRoom(room._id)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="admin-icon"
                      onClick={() => confirmarEliminarRoom(room._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowModal(true)} className="create-button">
            Crear Habitación
          </button>
        </div>
      )}
      {showUsersTab && (
        <div className="admin-table">
          <h2>Usuarios</h2>
          <table>
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
                              onClick={() => confirmarEliminarUsuario(user._id)}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={user.enabled}
                              onChange={() => toggleHabilitadoUsuario(user._id)}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <button
            onClick={() => setShowUserModal(true)}
            className="create-button"
          >
            Crear Usuario
          </button>
        </div>
      )}

      <ModalRoomAdmin
        show={showModal}
        handleClose={() => setShowModal(false)}
        guardarHabitacion={guardarHabitacion}
      />

      <CreateUserModal
        show={showUserModal}
        handleClose={() => setShowUserModal(false)}
        createUser={guardarUsuario}
      />
    </div>
  );
};

export default AdminView;
