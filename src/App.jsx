import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./components/room";
import Carrousel from "./components/carrousel";
import { Container } from "react-bootstrap";
import getAllRooms from "./utils/getAllRooms";
import Searcher from "./components/Searcher";
import FormRegister from "./views/FormRegister";


const App = () => {
  const [rooms, setRooms] = useState([]);

  return (
    <>
      <Container className="p-0 px-lg-5">
        <Carrousel />
      </Container>
      <Container className="px-0">
        <h3>Explora nuestras habitaciones</h3>
        <Searcher set={setRooms} xd="lol" />
        <div id="roomCardsContainer">
          {rooms.map((r) => (
            <Room image={r.images[0]} title={r.number} text={r.description} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default App;
