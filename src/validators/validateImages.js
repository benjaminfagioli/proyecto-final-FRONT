const regexImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))/gim;

const validateImages = (images) => {
  if (images.length === 0) throw new Error("Debe ingresar al menos una imagen");
  let incompatibles = [];
  images.forEach((i) => {
    console.log("Validating image:", i);
    if (!regexImage.test(i)) incompatibles.push(i);
  });
  if (incompatibles.length > 0) {
    throw new Error(
      `${incompatibles.join(", ")} no son compatibles como formato de imagen`
    );
  }
  return true;
};

export default validateImages;
