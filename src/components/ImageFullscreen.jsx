import "@fancyapps/ui/dist/fancybox/fancybox.css";
import React from "react";
import Fancybox from "./FancyBox";
import ImageComponent from "./ImageComponent";
import imagePlaceholder from "../assets/placeholder-image.jpg";
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
        <ImageComponent src={image} notFoundSrc={imagePlaceholder} />
      </a>
    </Fancybox>
  );
};

export default ImageFullscreen;
