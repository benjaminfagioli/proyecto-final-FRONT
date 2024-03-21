import axios from "axios";
import React, { useState } from "react";
import { URL_BASE } from "../config/config";
import { Col, Container, Row } from "react-bootstrap";
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
  let reserves = 0;
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
      if (error.response.status != 404) console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };

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
      <Container className="py-4">
        <h3 className="display-6  mb-0">Perfil</h3>
        {isLoading ? <Loader /> : ""}
        {user && (
          <>
            <span className="fs-4">{user.name} - </span>
            <span className="fs-4 fw-bold">{user.email}</span>
          </>
        )}
        <h3 className="mt-3 display-6  ">
          {rooms.length > 1 ? "Mis habitaciones" : "Mi habitacion"}
        </h3>
        {isLoading ? <Loader /> : ""}
        {rooms.length > 0 ? (
          <Container id="" className="px-0">
            <Row
              style={{
                gap: window.matchMedia("(max-width:768px)").matches
                  ? "0"
                  : "35px 0",
              }}
            >
              {rooms.map((room, i) => (
                <>
                  <Col
                    key={i}
                    className="d-flex align-items-center"
                    md={7}
                    lg={3}
                  >
                    <Room image={room.images[0]} title={room.number} />
                  </Col>
                  <Col
                    key={i}
                    className="d-flex flex-column mt-1 mb-5 my-md-0"
                    md={4}
                    lg={3}
                  >
                    <span className="fs-5 order-1 ">
                      {room.reserves.map((reserve, i) => {
                        if (reserve.userId == user.id) reserves = i;
                        if (reserve.userId == user.id)
                          return (
                            <ReserveInfo
                              key={i}
                              from={reserve.from}
                              to={reserve.to}
                              userId={reserve.userId}
                              room={room.number}
                            />
                          );
                      })}
                    </span>
                    <span className="fs-4  d-grid order-0">
                      {reserves != 0 ? "Reservas" : "Reservas"}
                    </span>
                  </Col>
                </>
              ))}
            </Row>
          </Container>
        ) : (
          <h4>No se encontraron habitaciones</h4>
        )}
      </Container>
    </>
  );
};

export default ProfileView;
