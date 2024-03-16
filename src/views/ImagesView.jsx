import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../config/config";
import { Container } from "react-bootstrap";
import shuffle from "../helpers/desordenarArray";
import "../styles/gallery.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ImageFullscreen from "../components/ImageFullscreen";
const ImagesView = () => {
  const [images, setImages] = useState([]);
  let queryImages;
  const getImages = async () => {
    try {
      const { data } = await axios.get(`${URL_BASE}/rooms/getImagesFromRooms`);
      setImages(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  shuffle(images);
  let cards = document.querySelectorAll(".containerImage");
  cards?.forEach((card) => {
    card.onmousemove = function (e) {
      let x = e.pageX - card.offsetLeft;
      let y = e.pageY - card.offsetTop;
      card.style.setProperty("--x", x + "px");
      card.style.setProperty("--y", y + "px");
    };
  });
  // let columns = 5;
  // let rows = 3;
  // let amounts = [1, 2, 3];
  // const divideColumns = () => {
  //   let spaces = columns * rows;
  //   let spacePerImage = [];
  //   for (let i = 0; i < images.length; i++) {
  //     let imageSpace = amounts[parseInt(Math.random() * amounts.length)];
  //     if (spaces - imageSpace > 0) {
  //       spacePerImage.push({ image: images[i], space: imageSpace });
  //       spaces = spaces - imageSpace;
  //     } else {
  //       imageSpace = spaces;
  //       spacePerImage.push({ image: images[i], space: imageSpace });
  //       console.log(spacePerImage.map((s) => s.space));
  //       return spacePerImage;
  //     }
  //   }
  // };
  // divideColumns();
  useEffect(() => {
    getImages();
  }, []);
  useEffect(() => {
    shuffle(images);
  }, [images]);
  return (
    <>
      <Container className="  " fluid>
        <Container>
          <h1 className="display-6 pt-4">Descubre nuestro hotel</h1>
          <div id="galleryContainer">
            {images.map(
              (imagen, i) =>
                i < 11 && (
                  <div key={i} className={`containerImage containerImage-${i}`}>
                    <ImageFullscreen image={imagen} />
                  </div>
                )
            )}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default ImagesView;
