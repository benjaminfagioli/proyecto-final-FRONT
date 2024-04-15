import React from "react";

// import { useState } from "react";

const ImageComponent = ({ notFoundSrc, src, ...imageAttributes }) => {
  // const [imgSrc, setImgSrc] = useState(src);
  return (
    <figure className="imageComponent">
      <img
        {...imageAttributes}
        src={src}
        onError={(e) => {
          e.target.classList.add("d-none");
          e.target.classList.remove("d-block");
          e.target.closest("figure").style.backgroundSize = "cover";
          e.target.closest("figure").style.aspectRatio = "1/1";
          console.log((e.target.closest("figure").style.aspectRatio = "1 / 1"));
        }}
        onLoad={(e) => {
          e.target.classList.remove("d-none");
          e.target.classList.add("d-block");
          e.target.closest("figure").style.backgroundSize = 0;
          // console.log((e.target.closest("figure").style.aspectRatio = ""));
          console.log((e.target.closest("figure").style.aspectRatio = ""));
        }}
      />
    </figure>
  );
};
export default ImageComponent;
