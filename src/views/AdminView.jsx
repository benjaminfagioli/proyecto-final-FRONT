import React, { useState, useEffect } from "react";
import getAllRooms from "../utils/getAllRooms.js";
import getAllUsers from "../utils/getAllUsers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { eliminarRoomById } from "../utils/eliminarRooms.js";
import Swal from "sweetalert2";
import "../styles/admin.css";
import { crearRoom } from "../utils/agregarRoom.js";
import Modal from "react-modal";
import registerUser from "../utils/registerUsers.js";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newRoomData, setNewRoomData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      closeModal();
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
      closeModal();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Usuario"
        className="formularioRoom"
      >
        <h2>Crear Usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newUserData.name}
          onChange={(e) =>
            setNewUserData({ ...newUserData, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserData.email}
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
        />
        <button onClick={crearUsuario}>Guardar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
      <div className="admin-table">
        <h2>Habitaciones</h2>
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Estrellas</th>
              <th>Visible</th>
              <th>Ocupada</th>
              <th>Descripción</th>
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
                    icon={faBookOpen}
                    className="admin-icon"
                    onClick={() => editDescription(room._id)}
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
        <button onClick={openModal} className="create-button">
          Crear Habitación
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Habitación"
        className="formularioRoom"
      >
        <input
          type="number"
          placeholder="Número"
          value={newRoomData.number}
          onChange={(e) => {
            const value = Math.min(Math.max(parseInt(e.target.value), 1), 999); // Limita el valor entre 1 y 999
            setNewRoomData({ ...newRoomData, number: value });
          }}
          min="1"
          max="999"
        />
        <input
          type="number"
          placeholder="Nivel"
          value={newRoomData.stars}
          onChange={(e) => {
            const value = Math.min(Math.max(parseInt(e.target.value), 1), 3); // Limita el valor entre 1 y 3
            setNewRoomData({ ...newRoomData, stars: value });
          }}
          min="1"
          max="3"
        />
        <textarea
          placeholder="Descripción"
          value={newRoomData.description}
          onChange={(e) => {
            const value = e.target.value.slice(0, 100);
            setNewRoomData({ ...newRoomData, description: value });
          }}
          maxLength="100"
        />
        <button onClick={crearHabitacion}>Guardar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default AdminView;
