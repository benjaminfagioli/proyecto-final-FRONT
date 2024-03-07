import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./components/room";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import Carrousel from "./components/carrousel";
import { Container } from "react-bootstrap";
import getAllRooms from "./utils/getAllRooms";
import Searcher from "./components/Searcher";
import FormRegister from "./views/FormRegister";
import Loader from "./components/Loader";

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async (set) => {
    try {
      const data = await fetch(`${URL_BASE}/rooms/allrooms`);
      const results = await data.json();
      console.log(results);
      set(results);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(rooms);
  useEffect(() => {
    getRooms(setRooms);
  }, []);
  return (
    <>
      <Container className="mb-4 pt-3">
        <Carrousel />
      </Container>
      <Container className="">
        <h3>Explora nuestras habitaciones</h3>
      </Container>
      <Container fluid id="roomCardsContainerBG" className="px-0">
        <Searcher set={setRooms} setIsLoading={setIsLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Container className="">
              <div id="roomCardsContainer">
                {!rooms.length ? (
                  <h1>Lo sentimos, no tenemos la habitacion que solicitas</h1>
                ) : (
                  rooms.map((r) => (
                    <Room
                      image={r.images[0]}
                      title={r.number}
                      text={r.description}
                    />
                  ))
                )}
              </div>
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default App;
