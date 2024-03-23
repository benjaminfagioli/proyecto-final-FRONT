import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/footer.css";
import logo from "../assets/Lovepik_com-401691148-hotel-travel-logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col
            md={6}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={logo}
              className="logoImg"
              alt="Logo de la hotelera (Hotel Travel)"
            />
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex flex-column justify-content-center px-3"
          >
            <div>
              <h4 className="fw-bold mb-2">Nuestra oficina</h4>
              <span className="d-block">
                Gral. Paz 576, T4000 San Miguel de Tucumán, Tucumán
              </span>
              <a
                target="_blank"
                href="https://www.google.com/maps/place/RollingCode+School/@-26.8365785,-65.2097473,17z/data=!3m1!4b1!4m6!3m5!1s0x94225d3ad7f30f1d:0xf8606cd659b8e3e4!8m2!3d-26.8365833!4d-65.207167!16s%2Fg%2F11h0b4kn08?entry=ttu"
                className="fs-5 fw-bold mb-2 "
              >
                Ver en el mapa {"  "}
                <i className="bi bi-arrow-up-right-circle-fill"></i>
              </a>
            </div>
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex flex-column justify-content-center px-3 my-3 my-md-5"
          >
            <div className="d-flex align-items-center justify-content-between w-100 mb-1">
              <Link
                className="fw-bold fs-5 d-flex align-items-center justify-content-between w-100"
                to={"/contacto"}
              >
                <span>Contáctanos</span>
                <i className="bi bi-arrow-right-circle-fill fs-2 ms-2" />
              </Link>
            </div>
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link
                className="fw-bold fs-5 d-flex align-items-center justify-content-between w-100"
                to={"/gallery"}
              >
                <span>Galería de Fotos</span>
                <i className="bi bi-arrow-right-circle-fill fs-2 ms-2" />
              </Link>
            </div>
          </Col>
          <Col
            md={6}
            lg={3}
            className="d-flex flex-column justify-content-center px-3 my-0 my-md-5"
          >
            <div className="d-flex flex-column  justify-content-between px-lg-4">
              <h3 className="display-6  fw-bold fs-4">
                El hotel de tus sueños ™
              </h3>
              <h4 className="fw-bold fs-5">Nuestras Redes</h4>
              <div id="socials" className="fs-4 ">
                <i className="bi bi-github"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-tiktok"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
