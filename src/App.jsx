import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./components/room";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import Carrousel from "./components/carrousel";
import { Container } from "react-bootstrap";
import Searcher from "./components/Searcher";
import imagePlaceholder from "../src/assets/placeholder-image.jpg";
import Loader from "./components/Loader";
import { Link } from "react-router-dom";
import ImageComponent from "./components/ImageComponent";

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Container fluid className="pb-2 pt-2 overflow-hidden">
        <Container>
          <Carrousel />
        </Container>
      </Container>
      <Container>
        <h3 className="poppins-bold">Explora nuestras habitaciones</h3>
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
                  rooms.map((r, i) => (
                    <Room
                      key={i}
                      image={r.images[0] || imagePlaceholder}
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
