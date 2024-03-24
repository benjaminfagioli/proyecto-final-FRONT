const validateImages = (images) => {
  if (images.length === 0) {
    throw new Error("Debe ingresar al menos una imagen");
  }

  return true;
};

export default validateImages;
