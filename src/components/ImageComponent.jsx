import React from "react";

import { useState } from "react";

const ImageComponent = ({ notFoundSrc, src, ...imageAttributes }) => {
  const [imgSrc, setImgSrc] = useState(src);
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
