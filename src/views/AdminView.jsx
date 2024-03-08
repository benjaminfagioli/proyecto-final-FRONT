import React, { useState, useEffect } from "react";
import getAllRooms from "../utils/getAllRooms.js";
import getAllUsers from "../utils/getAllUsers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faEdit } from "@fortawesome/free-solid-svg-icons";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

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
    // Aquí iría la lógica para cambiar el estado de isBusy
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId ? { ...room, isBusy: !room.isBusy } : room
      )
    );
  };

  const editDescription = (roomId) => {
    // Aquí iría la lógica para editar la descripción
    console.log(`Editar descripción de la habitación ${roomId}`);
  };

  const editRoom = (roomId) => {
    // Aquí iría la lógica para editar la habitación
    console.log(`Editar habitación ${roomId}`);
  };

  return (
    <div>
      <div style={{ float: "left", width: "50%" }}>
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
      </div>
      <div style={{ float: "right", width: "50%" }}>
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
                    style={{ cursor: "pointer" }}
                    onClick={() => editDescription(room._id)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ cursor: "pointer" }}
                    onClick={() => editRoom(room._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminView;
