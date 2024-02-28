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
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=1200&h=-1&s=1"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/56/d0/72/hotel-presidente.jpg?w=1200&h=-1&s=1"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d0/b5/d9/hotel-presidente.jpg?w=1200&h=-1&s=1"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/69/70/8e/hotel-presidente.jpg?w=1200&h=-1&s=1"></img>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/e9/ce/a0/hotel-presidente-4s-habitacion.jpg?w=1200&h=-1&s=1"></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}