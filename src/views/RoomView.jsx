import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import getASingleRoom from "../utils/getASingleRoom";
import { Col, Container, Row } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper React components
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  Mousewheel,
} from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import {
  faArrowsUpDownLeftRight,
  faBath,
  faBed,
  faStairs,
  faWifi,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/RoomView.css";
import numberToOrdinal from "../utils/numberToOrdinal";
import DatePicker from "../components/DatePicker";
import { addDays, differenceInCalendarDays } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_BASE } from "../config/config";
const RoomView = () => {
  const { number } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const infoReserve = useRef({
    from: "",
    to: "",
    room: Number(number),
  });
  const navigate = useNavigate();
  const handleReserve = async () => {
    console.log(new Date(infoReserve.current.from).toLocaleDateString("es-AR"));
    const token = localStorage.getItem("token");
    if (!token) {
      return Swal.fire({
        title: "Para realizar una reserva debes estar logueado",
        text: "Inicia sesión para disfrutar de todas las caracteristicas de nuestra página!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iniciar sesion",
        cancelButtonText: "Ahora no",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup");
        }
      });
    }
    console.log(token);
    try {
      const res = await axios.post(
        `${URL_BASE}/rooms/reserve`,
        infoReserve.current,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      if (res.status == 200)
        Swal.fire({
          icon: "success",
          title: "Reservada con éxito",
          html: `Has reservado la habitacion <b>n°${number}</b> desde <b>${new Date(
            infoReserve.current.from
          ).toLocaleDateString("es-AR")}</b> hasta <b>${new Date(
            infoReserve.current.to
          ).toLocaleDateString("es-AR")}</b>. Disfruta tu estadía en el Hotel`,
          showConfirmButton: true,
        }).then(() => {
          navigate(`/`);
        });
    } catch (error) {
      if (error.response.status == 401);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
      });
      if (error.response.status == 400)
        Swal.fire({
          icon: "error",
          title: "Error",
          html: `${error.response.data.errors.map((e) => `${e.msg} <br>`)}`,
          showConfirmButton: true,
        });
      console.log(error);
    }
  };
  console.log(room);
  useEffect(() => {
    getASingleRoom(number, setRoom);
  }, []);
  return (
    <>
      <Container fluid id="roomSection">
        <Container>
          <section>
            <Col md={10} lg={9}>
              <h1 className="fw-bold">
                ¡Conoce nuestra habitación n°{room?.number}!{" "}
              </h1>
              <p className="mb-3 fs-6 ">{room?.description}</p>
            </Col>
            <div className="row">
              <Col lg={9}>
                <Swiper
                  direction={"vertical"}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Scrollbar, Mousewheel]}
                  mousewheel={true}
                  className="mySwiper swiperRoomView"
                  spaceBetween={7}
                  // loop={true}
                >
                  {room?.images?.map((imagen, i) => (
                    <SwiperSlide key={i}>
                      <img src={imagen} alt="" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Col>
              <Col className="py-4" lg={3}>
                <div className="listRoomView fs-5 ">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBed} />
                    <span className="ms-3 me-2 fw-bold ">
                      {room?.properties?.bedrooms}
                    </span>
                    <span className=" fw-light ">
                      {room?.properties?.bedrooms == 1
                        ? "Dormitorio"
                        : "Dormitorios"}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faBath} />
                    <span className="ms-3 me-2  fw-bold ">
                      {room?.properties?.bathrooms}
                    </span>
                    <span className=" fw-light ">
                      {room?.properties?.bathrooms == 1 ? "Baño" : "Baños"}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faStairs} />
                    <span
                      className={`ms-3 ${
                        room?.properties?.floor == 0 ? "" : "me-1"
                      }  fw-bold `}
                    >
                      {room?.properties?.floor == 0
                        ? ""
                        : numberToOrdinal(room?.properties?.floor)}
                    </span>
                    <span className=" fw-light ">
                      {room?.properties?.floor == 0 ? "Planta baja" : "Piso"}
                    </span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                    <span className="ms-3 me-2  fw-bold ">
                      {room?.properties?.m2}
                    </span>
                    <span className=" fw-light ">M²</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faWifi} />
                    <span className="ms-3 me-2  fw-bold ">
                      {room?.properties?.wifi ? "Con" : "Sin"}
                    </span>
                    <span className=" fw-light ">Wi-Fi</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faWind} />
                    <span className="ms-3 me-2  fw-bold ">
                      {room?.properties?.airConditional ? "Con" : "Sin"}
                    </span>
                    <span className=" fw-light ">Aire acondicionado</span>
                  </div>
                </div>
              </Col>
            </div>
          </section>
        </Container>
      </Container>
      <Container id="roomSecondSection" className="py-4">
        <Row>
          <Col md={8} lg={7} className="d-flex justify-content-center">
            <DatePicker room={room} infoReserve={infoReserve} />
          </Col>
          <Col lg={5}>
            <button onClick={handleReserve}>Reservar</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RoomView;
