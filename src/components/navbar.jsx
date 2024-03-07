import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>Hotelera</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"}>Inicio</Link>

            <Link to={"/register"}>Registrate</Link>

            <Link to={"/signup"}>Iniciar sesión</Link>

            <Link to={"/admin"}>Panel de administrador</Link>

            <Link to={"/profile"}>Mi perfil</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
