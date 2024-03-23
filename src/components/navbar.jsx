import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { ADMIN_KEY, USER_KEY } from "../config/config";
import logo from "../assets/hotel-travel-logo.png";
import brand from "../assets/brand.png";

const NavBar = () => {
  const token = localStorage.getItem("token-Auth");
  const isAdmin = token === ADMIN_KEY;
  const isUser = token === USER_KEY;

  const handleLogout = () => {
    localStorage.removeItem("token-Auth");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className=" d-flex align-items-center">
          <img className="logoImg" src={logo} />
          <img className="brandImg" src={brand} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto fs-6 poppins-medium fw-bold">
            <>
              <Link to={"/"}>Inicio</Link>
              {token && <Link to={"/profile"}>Mi perfil</Link>}
              {!token && (
                <>
                  <Link to={"/register"}>Regístrate</Link>
                  <Link to={"/signup"}>Inicia sesión</Link>
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
