import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/sobreNosotros.css";

function PersonaCard({ name, role, image, text, github, linkedin }) {
  const openGithubProfile = () => {
    window.open(github, "_blank");
  };
  const openLinkedinProfile = () => {
    window.open(linkedin, "_blank");
  };

  return (
    <Card>
      <Card.Img variant="top" style={{ aspectRatio: "1" }} src={image} />
      <Card.Body>
        <Card.Title className="poppins-semibold">
          {name} como {role}
        </Card.Title>
        <Card.Text className="poppins-light">{text}</Card.Text>
        <Button className="create-button" onClick={openGithubProfile}>
          Ve mis proyectos!
        </Button>
        <Button className="create-button" onClick={openLinkedinProfile}>
          Mira mi Linkedin!
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PersonaCard;
