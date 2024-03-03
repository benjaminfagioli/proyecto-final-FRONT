const convertObjectToQueryParams = (object) => {
  let queryString = "?";
  for (const key in object) {
    if (object[key]) {
      queryString.length == 1
        ? (queryString += `${key}=${object[key]}`)
        : (queryString += `&${key}=${object[key]}`);
    }
  }
  return queryString;
};
export default convertObjectToQueryParams;
