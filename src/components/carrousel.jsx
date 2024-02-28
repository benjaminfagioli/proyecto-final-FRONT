import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "../styles/carrousel.css";
import { EffectCards } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=1200&h=-1&s=1"
              alt="Slide 1"
            ></img>
            <div className="text-overlay">El hotel mas lujoso de la ciudad</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/56/d0/72/hotel-presidente.jpg?w=1200&h=-1&s=1"
              alt="Slide 2"
            ></img>
            <div className="text-overlay">
              Con impresionantes salas de estar
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d0/b5/d9/hotel-presidente.jpg?w=1200&h=-1&s=1"
              alt="Slide 3"
            ></img>
            <div className="text-overlay">Las mejores comidas incluidas</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/69/70/8e/hotel-presidente.jpg?w=1200&h=-1&s=1"
              alt="Slide 4"
            ></img>
            <div className="text-overlay">Baños de altas prestaciones</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/e9/ce/a0/hotel-presidente-4s-habitacion.jpg?w=1200&h=-1&s=1"
              alt="Slide 5"
            ></img>
            <div className="text-overlay">Y habitaciones soñadas</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
