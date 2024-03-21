import React from "react";

import { useState } from "react";

const ImageComponent = ({ notFoundSrc, src, ...imageAttributes }) => {
  const [imgSrc, setImgSrc] = useState(src);
  console.log(imageAttributes);
  return (
    <img
      {...imageAttributes}
      src={imgSrc || notFoundSrc}
      onError={() => {
        setImgSrc(notFoundSrc);
      }}
    />
  );
};
export default ImageComponent;
