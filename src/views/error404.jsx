import React from "react";
import error404Image from "../assets/error404.jpg.webp";
import "../styles/404.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      {" "}
      <h1>Uy!!... Parece que la pagina no existe</h1>
      <h3>Porfavor realiza otra busqueda</h3>
      <img src={error404Image} alt="Error 404" />
    </div>
  );
};

export default NotFound;
