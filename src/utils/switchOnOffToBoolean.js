const switchOnOffToBoolean = (object) => {
  for (const key in object) {
    const element = object[key];
    if (element == "on") {
      object[key] = true;
    }
    if (element == "") delete object[key];
  }
  return object;
};
export default switchOnOffToBoolean;
