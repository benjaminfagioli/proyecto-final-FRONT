import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/rooms.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import imagePlaceholder from "../../src/assets/placeholder-image.jpg";
import ImageComponent from "./ImageComponent";

const Room = ({ image, text, title }) => {
  const navigate = useNavigate();
  const handleNagivate = (e) => {
    e.preventDefault();
    navigate(`/room/${title}`);
  };
  return (
    <div className="roomCard">
      <div className="imgContainer">
        <ImageComponent src={image} notFoundSrc={imagePlaceholder} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>
            <span className="poppins-extralight">Habitación n°{title}</span>

            <Button variant="transparent" onClick={handleNagivate}>
              <i className="bi bi-box-arrow-in-up-right"></i>
            </Button>
          </Card.Title>
        </div>
      </Card.Body>
    </div>
  );
};

export default Room;
