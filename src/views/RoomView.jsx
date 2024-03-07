import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getASingleRoom from "../utils/getASingleRoom";
import { Col, Container } from "react-bootstrap";

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

import "../styles/RoomView.css";
import numberToOrdinal from "../utils/numberToOrdinal";

const RoomView = () => {
  const { number } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setisLoading] = useState(null);

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
                  {room?.images?.map((imagen) => (
                    <SwiperSlide>
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
      <Container fluid id="roomSecondSection">
        <Container></Container>
      </Container>
    </>
  );
};
// <i class="bi bi-arrows-fullscreen"></i>
// <i class="fa-solid fa-bed"></i>
// <i class="fa-solid fa-shower"></i> || <i class="fa-solid fa-bath"></i>
// <i class="fa-solid fa-stairs"></i>
export default RoomView;
