import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/rooms.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const Room = ({ image, text, title }) => {
  const navigate = useNavigate();
  const handleNagivate = (e) => {
    e.preventDefault();
    navigate(`/room/${title}`);
  };
  return (
    <div className="roomCard">
      <div className="imgContainer">
        <Card.Img variant="top" src={image} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>
            Habitación n°{title}
            <Button variant="transparent" onClick={handleNagivate}>
              <i className="bi bi-box-arrow-in-up-right"></i>
            </Button>
          </Card.Title>
          {/* <Card.Text>{text}</Card.Text> */}
        </div>
      </Card.Body>
    </div>
  );
};

export default Room;
