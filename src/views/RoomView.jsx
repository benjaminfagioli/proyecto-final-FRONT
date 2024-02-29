import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getASingleRoom from "../utils/getASingleRoom";
import { Container } from "react-bootstrap";

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

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

const RoomView = () => {
  const { number } = useParams();
  const [room, setRoom] = useState(null);
  const [isLoading, setisLoading] = useState(null);

  console.log(room);
  useEffect(() => {
    getASingleRoom(number, setRoom);
  }, []);
  return (
    <Container fluid id="roomSection">
      <Container>
        <section>
          <h1>¡Conoce la habitación {room?.number}!</h1>
          <p>{room?.description}</p>
          <div>
            <Swiper
              direction={"vertical"}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Scrollbar, Mousewheel]}
              mousewheel={true}
              className="mySwiper"
              spaceBetween={7}
            >
              {room?.images?.map((imagen) => (
                <SwiperSlide>
                  <img src={imagen} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </Container>
    </Container>
  );
};

export default RoomView;
