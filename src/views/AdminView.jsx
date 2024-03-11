import React, { useState, useEffect } from "react";
import getAllRooms from "../utils/getAllRooms.js";
import getAllUsers from "../utils/getAllUsers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { eliminarRoomById } from "../utils/eliminarRooms.js";
import Swal from "sweetalert2";
import "../styles/admin.css";
import { crearRoom } from "../utils/agregarRoom.js";
import registerUser from "../utils/registerUsers.js";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newRoomData, setNewRoomData] = useState({});
  const [newUserData, setNewUserData] = useState({});

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

  const toggleIsBusy = (roomId) => {
    console.log("cambiando estado isBusy de", roomId);
  };

  const editDescription = (roomId) => {
    console.log(`Editar descripción de la habitación ${roomId}`);
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

  const crearUsuario = async () => {
    try {
      await registerUser(newUserData);
      const updateUserData = await getAllUsers();
      setUsers(updateUserData);
      setNewRoomData({});
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const crearHabitacion = async () => {
    try {
      await crearRoom(newRoomData);
      const updatedRoomsData = await getAllRooms();
      setRooms(updatedRoomsData);
      setNewRoomData({});
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-table">
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={crearUsuario} className="create-button">
          Crear Usuario
        </button>
      </div>
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
        <button onClick={crearHabitacion} className="create-button">
          Crear Habitación
        </button>
      </div>
    </div>
  );
};

export default AdminView;
