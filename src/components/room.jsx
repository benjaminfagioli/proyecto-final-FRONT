import React from "react";
import Card from "react-bootstrap/Card";

const Room = ({ image, text, title }) => {
  return (
    <div style={{ height: "100%" }} className="roomCard">
      <div className="imgContainer">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body>
        <Card.Title>Habitación n°{title}</Card.Title>
      </Card.Body>
    </div>
  );
};

export default Room;
