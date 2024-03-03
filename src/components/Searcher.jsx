import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import switchOnOffToBoolean from "../utils/switchOnOffToBoolean";
import "../styles/searcher.css";
const Searcher = ({ set }) => {
  const [useParams, setUseParams] = useSearchParams({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    switchOnOffToBoolean(formData);
    setUseParams(formData);
  };

  const reset = () => {
    searchForm.reset();
    // setUseParams({});
  };

  const updateStateWithQuery = async () => {
    let queryString = useParams.toString();
    try {
      const request = await axios.get(
        `${URL_BASE}/rooms/search?${queryString}`
      );
      set(request.data);
    } catch (error) {
      set([]);
      console.log(error.message);
    }
  };

  useEffect(() => {
    updateStateWithQuery();
  }, [useParams]);
  return (
    <>
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="fs-6 fw-bold">
          <label htmlFor="">
            Estrellas
            <input name="stars" type="number" min={1} max={3} />
          </label>
          <label htmlFor="">
            Dormitorios
            <input name="bedrooms" type="number" min={1} max={3} />
          </label>
          <label htmlFor="">
            Baños
            <input name="bathrooms" type="number" min={1} max={3} />
          </label>
          <label htmlFor="">
            Planta
            <input name="floor" type="number" min={0} max={10} />
          </label>
          <label htmlFor="">
            Wifi
            <label class="containerCbx">
              <input name="wifi" type="checkbox" />
              <svg viewBox="0 0 64 64" height="20px" width="20px">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  class="path"
                ></path>
              </svg>
            </label>
          </label>
          <label htmlFor="">
            Aire Acondicionado
            <label class="containerCbx">
              <input name="airConditioner" type="checkbox" />
              <svg viewBox="0 0 64 64" height="20px" width="20px">
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  class="path"
                ></path>
              </svg>
            </label>
          </label>
        </div>
        <div>
          <button type="submit">Buscar</button>
          <button onClick={reset}>Limpiar filtros</button>
        </div>
      </form>
    </>
  );
};

export default Searcher;
