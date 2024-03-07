import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import switchOnOffToBoolean from "../utils/switchOnOffToBoolean";
import "../styles/searcher.css";
import { Container } from "react-bootstrap";
import cadenaABooleano from "../utils/cadenaABooleano";
import convertStarsToString from "../utils/convertStarstoString";
const Searcher = ({ set, setIsLoading }) => {
  const [useParams, setUseParams] = useSearchParams({});
  const filters = useRef();

  console.log(filters.current);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    switchOnOffToBoolean(formData);
    setUseParams(formData);
  };

  const reset = (e) => {
    filters.current = {};
    console.log(e.target.form);
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
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(useParams.get("stars"));
  useEffect(() => {
    updateStateWithQuery();
  }, [useParams]);
  useEffect(() => {
    filters.current = {};
    useParams.forEach(
      (c, v) =>
        (filters.current[v] = isNaN(c) ? cadenaABooleano(c) : parseInt(c))
    );
  }, []);
  return (
    <>
      <form id="searchForm" onSubmit={handleSubmit}>
        <Container className="display-flex justify-content-between">
          <div className="fs-6 fw-bold">
            <label htmlFor="">
              Tipo
              <div className="select">
                <select name="stars" defaultValue={filters.current?.stars}>
                  <option selected hidden value="">
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
                  <option selected hidden class="default" value="">
                    {filters.current?.bedrooms}
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
                  <option selected hidden class="default" value="">
                    {filters.current?.bathrooms}
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </label>
            <label htmlFor="">
              Planta
              <div className="select">
                <select name="floor" defaultValue={filters.current?.floor}>
                  <option selected hidden class="default" value="">
                    {filters.current?.bathrooms}
                  </option>
                  <option value="0">Planta baja</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
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
          <div>
            <button type="submit">Buscar</button>
            <button onClick={reset}>Limpiar filtros</button>
          </div>
        </Container>
      </form>
    </>
  );
};

export default Searcher;
