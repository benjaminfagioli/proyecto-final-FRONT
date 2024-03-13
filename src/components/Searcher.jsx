import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import switchOnOffToBoolean from "../utils/switchOnOffToBoolean";
import "../styles/searcher.css";
import { Container } from "react-bootstrap";
import cadenaABooleano from "../utils/cadenaABooleano";
import convertStarsToString from "../utils/convertStarstoString";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
const Searcher = ({ set, setIsLoading }) => {
  const [useParams, setUseParams] = useSearchParams({});
  const [dataForInputs, setDataForInputs] = useState({});
  const filters = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData);
    switchOnOffToBoolean(formData);
    setUseParams(formData);
  };

  const reset = (e) => {
    filters.current = {};
    e.target.form.reset();
    setUseParams({});
  };

  const updateStateWithQuery = async () => {
    setIsLoading(true);
    let queryString = useParams.toString();
    try {
      const request = await axios.get(
        `${URL_BASE}/rooms/search?${queryString}`
      );
      set(request.data);
    } catch (error) {
      set([]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDataToRender = async () => {
    try {
      const { data } = await axios.get(`${URL_BASE}/rooms/getDataToSearcher`);
      await setDataForInputs(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataForInputs);
  useEffect(() => {
    updateStateWithQuery();
  }, [useParams]);
  useEffect(() => {
    getDataToRender();
    useParams.forEach(
      (c, v) =>
        (filters.current[v] = isNaN(c) ? cadenaABooleano(c) : parseInt(c))
    );
  }, []);
  return (
    <>
      <form id="searchForm" onSubmit={handleSubmit}>
        <Container className="display-flex justify-content-between w-100 position-relative pb-5">
          <div className="fs-6 fw-bold">
            <label htmlFor="">
              Precio
              <div className="d-flex flex-column gap-2">
                <span className="fw-light ms-2">
                  desde
                  <input
                    id="lowerPriceInput"
                    onBlur={() => {
                      if (
                        lowerPriceInput.value >
                        dataForInputs.price.highest.price
                      )
                        lowerPriceInput.value =
                          dataForInputs.price.highest.price;
                      if (lowerPriceInput.value < 1) lowerPriceInput.value = 1;
                    }}
                    min={0}
                    max={dataForInputs.price.highest.price}
                    type="number"
                    name="lowerPrice"
                    className="inputNumber ms-1"
                  />
                </span>
                <span className="fw-light ms-2">
                  hasta
                  <input
                    id="highestPriceInput"
                    onBlur={() => {
                      if (
                        highestPriceInput.value >
                        dataForInputs.price.highest.price
                      )
                        highestPriceInput.value =
                          dataForInputs.price.highest.price;
                      if (highestPriceInput.value < 1)
                        lowerPriceInput.value = 1;
                    }}
                    min={0}
                    max={dataForInputs.price.highest.price}
                    type="number"
                    name="highestPrice"
                    className="inputNumber ms-1"
                  />
                </span>
              </div>
            </label>
            <label htmlFor="">
              Tipo
              <div className="select">
                <select name="stars" defaultValue={filters.current?.stars}>
                  <option hidden value="">
                    {convertStarsToString(filters.current?.stars)}
                  </option>
                  <option value="1">Basica</option>
                  <option value="2">Media</option>
                  <option value="3">Premium</option>
                </select>
              </div>
            </label>
            <label htmlFor="">
              Dormitorios
              <div className="select">
                <select
                  name="bedrooms"
                  defaultValue={filters.current?.bedrooms}
                >
                  <option hidden className="default" value="">
                    {filters.current?.bedrooms}
                  </option>
                  {dataForInputs?.bedrooms?.length > 0 &&
                    dataForInputs.bedrooms
                      .sort((a, b) => a - b)
                      .map((dormitorio) => (
                        <option value={dormitorio}>{dormitorio}</option>
                      ))}
                </select>
              </div>
            </label>
            <label htmlFor="">
              Baños
              <div className="select">
                <select
                  name="bathrooms"
                  defaultValue={filters.current?.bathrooms}
                >
                  <option hidden className="default" value="">
                    {filters.current?.bathrooms}
                  </option>
                  {dataForInputs?.bathrooms?.length > 0 &&
                    dataForInputs.bathrooms
                      .sort((a, b) => a - b)
                      .map((banio) => <option value={banio}>{banio}</option>)}
                </select>
              </div>
            </label>
            <label htmlFor="">
              Planta
              <div className="select">
                <select name="floor" defaultValue={filters.current?.floor}>
                  <option hidden className="default" value="">
                    {filters.current?.bathrooms}
                  </option>
                  {dataForInputs?.floors?.length > 0 &&
                    dataForInputs.floors
                      .sort((a, b) => a - b)
                      .map((planta) => (
                        <option value={planta}>
                          {planta == 0 ? "Planta baja" : planta}
                        </option>
                      ))}
                </select>
              </div>
            </label>
            <label htmlFor="">
              Wifi
              <label className="containerCbx">
                <input
                  name="wifi"
                  type="checkbox"
                  defaultChecked={filters.current?.wifi}
                />
                <svg viewBox="0 0 64 64" height="20px" width="20px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  ></path>
                </svg>
              </label>
            </label>
            <label htmlFor="">
              Aire Acondicionado
              <label className="containerCbx">
                <input
                  name="airConditioner"
                  defaultChecked={filters.current?.airConditioner}
                  type="checkbox"
                />
                <svg viewBox="0 0 64 64" height="20px" width="20px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  ></path>
                </svg>
              </label>
            </label>
          </div>
          <div className="endButtons">
            <button type="submit">Buscar</button>
            <button onClick={reset}>Limpiar filtros</button>
          </div>
        </Container>
      </form>
    </>
  );
};

export default Searcher;
