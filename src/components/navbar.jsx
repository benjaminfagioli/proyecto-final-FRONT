import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>Hotelera</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#features">Registrate</Nav.Link>
          <Nav.Link href="#pricing">Inicio Sesion</Nav.Link>
          <Nav.Link href="#pricing">Panel de Administrador</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
