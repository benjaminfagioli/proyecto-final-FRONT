import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token-Auth");
  const isAdmin = token === "2c128f52-26da-4bc9-bfc3-1014cd10b04a";
  const isAuthenticated = token === "42c08349-9d0b-4b43-80ab-7241767da1b7";

  const handleLogout = () => {
    localStorage.removeItem("token-Auth");
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>Hotelera</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && !isAdmin ? (
              <>
                <Link to={"/"}>Inicio</Link>
                <Link to={"/profile"}>Mi perfil</Link>
                <Link to={"/aboutUs"}>Sobre Nosotros</Link>
                <Link to={"/admin"}>Panel de administrador</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : isAuthenticated && isAdmin ? (
              <>
                <Link to={"/"}>Inicio</Link>
                <Link to={"/profile"}>Mi perfil</Link>
                <Link to={"/aboutUs"}>Sobre Nosotros</Link>
                <button onClick={handleLogout} className="nav-link">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to={"/"}>Inicio</Link>
                <Link to={"/signup"}>Iniciar sesión</Link>
                <Link to={"/register"}>Registrate</Link>
                <Link to={"/aboutUs"}>Sobre Nosotros</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
