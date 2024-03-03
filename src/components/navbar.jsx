import { Navbar, Nav } from "react-bootstrap";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand>Hotelera</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#features">Registrate</Nav.Link>
          <Nav.Link href="#pricing">Inicio Sesion</Nav.Link>
          <Nav.Link href="#pricing">Panel de Administrador</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
