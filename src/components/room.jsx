import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/rooms.css";

const Room = ({ image, text, title }) => {
  return (
    <div className="roomCard">
      <div className="imgContainer">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>Habitación n°{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </div>
        <i class="bi bi-box-arrow-in-up-right"></i>
      </Card.Body>
    </div>
  );
};

export default Room;
