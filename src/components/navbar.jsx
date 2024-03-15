import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token-Auth");
  const isAdmin = token === "2c128f52-26da-4bc9-bfc3-1014cd10b04a";
  const isUser = token === "42c08349-9d0b-4b43-80ab-7241767da1b7";

  const handleLogout = () => {
    localStorage.removeItem("token-Auth");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  console.log(isAdmin);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>Hotelera</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <>
              <Link to={"/"}>Inicio</Link>
              {token && <Link to={"/profile"}>Mi perfil</Link>}
              {!token && (
                <>
                  <Link to={"/register"}>Registrate</Link>
                  <Link to={"/signup"}>Iniciar sesión</Link>
                </>
              )}
              <Link to={"/aboutUs"}>Sobre Nosotros</Link>
              {isAdmin && <Link to={"/admin"}>Panel de administrador</Link>}
              {token && (
                <button className="p-0" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              )}
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
