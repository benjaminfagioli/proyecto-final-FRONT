import React from "react";
import Card from "react-bootstrap/Card";

function PersonaCard({ name, role, image, text }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>
          {name} como {role}
        </Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PersonaCard;
