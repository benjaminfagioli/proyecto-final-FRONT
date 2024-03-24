import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import getASingleRoom from "../utils/getASingleRoom";
import { Col, Container, Row, Spinner } from "react-bootstrap";

//  Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  Mousewheel,
} from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import {
  addDays,
  differenceInCalendarDays,
  intervalToDuration,
} from "date-fns";

import Swal from "sweetalert2";
import axios from "axios";
import { ADMIN_KEY, URL_BASE } from "../config/config";
import PaymentButton from "../components/PaymentButton";
import ReserveInfo from "../components/ReserveInfo";
import ImageComponent from "../components/ImageComponent";
import imagePlaceholder from "../assets/placeholder-image.jpg";
import Loader from "../components/Loader";
const RoomView = () => {
  const { number } = useParams();
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const navigate = useNavigate();
  const infoReserve = useRef({
    from: "",
    to: "",
    room: Number(number),
  });
  const token = localStorage.getItem("token");
  const authToken = localStorage.getItem("token-Auth");
  const handleReserve = async () => {
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
    if (infoReserve.current.from === "" || infoReserve.current.to === "")
      return Swal.fire({
        title: "",
        text: "Debes elegir una fecha antes de reservar",
        icon: "info",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    console.log(
      Intl.NumberFormat("ES-LA", {
        currency: "ARS",
      }).format(
        room.price *
          (intervalToDuration({
            start: new Date(infoReserve.current.from),
            end: new Date(infoReserve.current.to),
          }).days + 1 || 1)
      )
    );
    Swal.fire({
      title: "¿Estás seguro de tu reservación?",
      html: `Elegiste la habitacion <b>n°${number}</b> desde <b>${new Date(
        infoReserve.current.from
      ).toLocaleDateString("es-AR")}</b> hasta <b>${new Date(
        infoReserve.current.to
      ).toLocaleDateString(
        "es-AR"
      )}</b>. La cuota total seria de $${Intl.NumberFormat("ES-LA", {
        style: "currency",
        currency: "ARS",
      }).format(
        room.price *
          (intervalToDuration({
            start: new Date(infoReserve.current.from),
            end: new Date(infoReserve.current.to),
          }).days + 1 || 1)
      )}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reservar",
      cancelButtonText: "Ahora no",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
              ).toLocaleDateString(
                "es-AR"
              )}</b>. Disfruta tu estadía en el Hotel`,
              showConfirmButton: true,
            }).then(() => {
              navigate(`/`);
            });
        } catch (error) {
          console.log(error);
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
      }
    });
  };
  const getProfile = async () => {
    setisLoading(true);
    try {
      const userFound = await axios.get(`${URL_BASE}/users/profile`, {
        headers: {
          "auth-token": token,
        },
      });
      setUser(userFound.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getASingleRoom(number, setRoom);
    if (token) getProfile();
  }, []);
  return (
    <>
      {!room ? (
        <Container
          fluid
          id="roomSection"
          style={{ minHeight: "calc(100vh - 80px - 260px)" }}
        >
          <Loader />
        </Container>
      ) : (
        <>
          <Container fluid id="roomSection">
            <Container>
              <section>
                <Col md={10} lg={9}>
                  <h1 className="poppins-bold">
                    ¡Conoce nuestra habitación n°{room?.number}!{" "}
                  </h1>
                  <p className="mb-3 fs-6 poppins-regular fw-extralight  ">
                    {room?.description}
                  </p>
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
                          <ImageComponent
                            src={imagen}
                            notFoundSrc={imagePlaceholder}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Col>
                  <Col className="py-4" lg={3}>
                    <div className="listRoomView fs-5 ">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faBed} />
                        <span className="ms-3 me-2 poppins-bold ">
                          {room?.properties?.bedrooms}
                        </span>
                        <span className=" poppins-light ">
                          {room?.properties?.bedrooms == 1
                            ? "Dormitorio"
                            : "Dormitorios"}
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faBath} />
                        <span className="ms-3 me-2  poppins-bold   ">
                          {room?.properties?.bathrooms}
                        </span>
                        <span className=" poppins-light ">
                          {room?.properties?.bathrooms == 1 ? "Baño" : "Baños"}
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faStairs} />
                        <span
                          className={`ms-3 ${
                            room?.properties?.floor == 0 ? "" : "me-1"
                          }  poppins-bold  `}
                        >
                          {room?.properties?.floor == 0
                            ? ""
                            : numberToOrdinal(room?.properties?.floor)}
                        </span>
                        <span className=" poppins-light ">
                          {room?.properties?.floor == 0
                            ? "Planta baja"
                            : "Piso"}
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
                        <span className="ms-3 me-2  poppins-bold   ">
                          {room?.properties?.m2}
                        </span>
                        <span className=" poppins-light ">M²</span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faWifi} />
                        <span className="ms-3 me-2  poppins-bold   ">
                          {room?.properties?.wifi ? "Con" : "Sin"}
                        </span>
                        <span className=" poppins-light ">Wi-Fi</span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faWind} />
                        <span className="ms-3 me-2  poppins-bold   ">
                          {room?.properties?.airConditional ? "Con" : "Sin"}
                        </span>
                        <span className=" poppins-light ">
                          Aire acondicionado
                        </span>
                      </div>
                    </div>
                  </Col>
                </div>
              </section>
            </Container>
          </Container>
          <Container id="roomSecondSection" className="py-4">
            <Row>
              <Col
                md={12}
                lg={7}
                className="d-flex justify-content-center pe-lg-5"
              >
                <DatePicker room={room} infoReserve={infoReserve} />
              </Col>
              <Col className="mt-4 mt-lg-0 ps-lg-0 d-flex flex-column" lg={5}>
                <div className="mb-3">
                  <h5 className="display-5 fs-5 poppins-bold">
                    A tan solo $
                    {Intl.NumberFormat("ES-LA", {
                      style: "currency",
                      currency: "ARS",
                    }).format(room?.price)}{" "}
                    por noche
                  </h5>
                  <PaymentButton onClick={handleReserve}>
                    Reservar{" "}
                  </PaymentButton>
                </div>
                {user &&
                room?.reserves?.find((reserve) => reserve.userId == user.id) ? (
                  <div>
                    <h5 className="display-5 fs-4 poppins-light">
                      Mis reservas
                    </h5>
                    {room?.reserves?.map((reserve, i) => {
                      if (reserve.userId == user.id)
                        return (
                          <ReserveInfo
                            key={i}
                            from={reserve.from}
                            to={reserve.to}
                            userId={reserve.userId}
                            room={room.number}
                          />
                        );
                    })}
                  </div>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1060679525185!2d-65.20974728915576!3d-26.83657848992945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1710628449002!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
      {authToken === ADMIN_KEY && (
        <Container id="roomAdminSection">
          <Row>
            <h2>Reservas de los usuarios</h2>
            <Col>
              {Array.isArray(room?.reserves) && room?.reserves?.length > 0 ? (
                room?.reserves?.map((reserve, i) => {
                  return (
                    <>
                      <h4>{reserve?.email}</h4>
                      <ReserveInfo
                        key={i}
                        from={reserve?.from}
                        to={reserve?.to}
                        userId={reserve?.userId}
                        room={room.number}
                      />
                    </>
                  );
                })
              ) : (
                <p>No se encontraron reservas</p>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default RoomView;
