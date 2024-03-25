import React from "react";
import Card from "react-bootstrap/Card";

function PersonaCard({ name, role, image, text }) {
  return (
    <Card>
      <Card.Img variant="top" style={{ aspectRatio: "1" }} src={image} />
      <Card.Body>
        <Card.Title className="poppins-semibold">
          {name} como {role}
        </Card.Title>
        <Card.Text className="poppins-light">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PersonaCard;
