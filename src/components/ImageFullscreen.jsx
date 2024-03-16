import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React from "react";
import Fancybox from "./FancyBox";

const ImageFullscreen = ({ image, description, id }) => {
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
        Images: {
          Panzoom: {
            panMode: "mousemove",
            mouseMoveFactor: 1.1,
            mouseMoveFriction: 0.72,
          },
        },
      }}
    >
      <a data-fancybox href={image} data-caption={description}>
        <img id={id} src={image} />
      </a>
    </Fancybox>
  );
};

export default ImageFullscreen;
