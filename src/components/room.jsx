import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/rooms.css";
import { useNavigate } from "react-router-dom";
import imagePlaceholder from "../../src/assets/placeholder-image.jpg";
import ImageComponent from "./ImageComponent";

const Room = ({ image, title }) => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/room/${title}`);
  };

  return (
    <div
      className="roomCard"
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      <div className="imgContainer">
        <ImageComponent src={image} notFoundSrc={imagePlaceholder} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>
            <span className="poppins-light">Habitación n°{title}</span>
          </Card.Title>
        </div>
      </Card.Body>
    </div>
  );
};

export default Room;
