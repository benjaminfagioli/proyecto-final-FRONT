import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../config/config";
import { Container } from "react-bootstrap";
import shuffle from "../helpers/desordenarArray";
import "../styles/gallery.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ImageFullscreen from "../components/ImageFullscreen";
import Loader from "../components/Loader";
const ImagesView = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getImages = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL_BASE}/rooms/getImagesFromRooms`);
      setImages(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  let cards = document.querySelectorAll(".containerImage");
  cards?.forEach((card) => {
    card.onmousemove = function (e) {
      let x = e.pageX - card.offsetLeft;
      let y = e.pageY - card.offsetTop;
      card.style.setProperty("--x", x + "px");
      card.style.setProperty("--y", y + "px");
    };
  });
  useEffect(() => {
    getImages();
  }, []);
  useEffect(() => {
    if (Array.isArray(images)) shuffle(images);
  }, [images]);
  return (
    <>
      <Container className="  " fluid>
        <Container className="px-0 px-sm-2">
          <h1 className="display-6 pt-4 poppins-semibold">
            Descubre nuestro hotel
          </h1>

          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : Array.isArray(images) ? (
            <div id="galleryContainer">
              {images.map(
                (imagen, i) =>
                  i < 11 && (
                    <div
                      key={i}
                      className={`containerImage containerImage-${i}`}
                    >
                      <ImageFullscreen image={imagen} />
                    </div>
                  )
              )}
            </div>
          ) : (
            <h2>Lo sentimos, no se pudieron cargar las imágenes</h2>
          )}
        </Container>
      </Container>
    </>
  );
};

export default ImagesView;
