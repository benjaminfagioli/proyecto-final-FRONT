import axios from "axios";
import React, { useState } from "react";
import { URL_BASE } from "../config/config";
import { Container } from "react-bootstrap";
import Room from "../components/room";
import Loader from "../components/Loader";
import ReserveInfo from "../components/ReserveInfo";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const token = localStorage.getItem("token");
  const getProfile = async (token, set) => {
    setisLoading(true);
    try {
      const userFound = await axios.get(`${URL_BASE}/users/profile`, {
        headers: {
          "auth-token": token,
        },
      });
      setUser(userFound.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };
  const getMyRooms = async (token, set) => {
    setisLoading(true);
    try {
      const results = await axios.get(`${URL_BASE}/rooms/getallMyRooms`, {
        headers: {
          "auth-token": token,
        },
      });
      setRooms(results.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };
  console.log(rooms);
  useState(() => {
    getProfile(token, setUser);
  }, []);
  useState(() => {
    getMyRooms(token, setRooms);
    rooms.map((room, i) => {
      console.log(room.reserves, room.number);
    });
  }, [user]);
  return (
    <>
      <Container>
        <h1>Perfil</h1>
        {isLoading ? <Loader /> : ""}
        {user && (
          <>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
          </>
        )}
        <h1>Mis habitaciones</h1>
        {isLoading ? <Loader /> : ""}
        {rooms.length > 0 ? (
          <Container id="roomCardsContainer" className="px-0">
            {rooms.map((room) => (
              <>
                <Room image={room.images[0]} title={room.number} />
                <span className="fs-4">
                  Reserva/s:{" "}
                  {room.reserves.map(
                    (reserve) =>
                      reserve.userId == user.id && (
                        <ReserveInfo
                          from={reserve.from}
                          to={reserve.to}
                          userId={reserve.userId}
                          room={room.number}
                        />
                      )
                  )}
                </span>
              </>
            ))}
          </Container>
        ) : (
          <h4>No se encontraron habitaciones</h4>
        )}
      </Container>
    </>
  );
};

export default ProfileView;
