import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./components/room";
const URL_BASE = "http://localhost:8080";
import Carrousel from "./components/carrousel";

const App = () => {
  const [rooms, setRooms] = useState([]);

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

  useEffect(() => {
    getRooms(setRooms);
  }, []);
  return (
    <>
      <Navbar />
      <Carrousel />
      <div id="roomCardsContainer">
        {rooms.map((r) => (
          <Room image={r.images[0]} title={r.number} text={r.description} />
        ))}
      </div>
    </>
  );
};

export default App;
