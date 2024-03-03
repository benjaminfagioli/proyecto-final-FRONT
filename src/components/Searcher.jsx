import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const URL_BASE = import.meta.env.VITE_URL_BASE;
import switchOnOffToBoolean from "../utils/switchOnOffToBoolean";
import convertObjectToQueryParams from "../utils/convertObjectToQueryParams";
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
        <label htmlFor="">
          Estrellas
          <input name="stars" type="number" min={1} max={3} />
        </label>
        <label htmlFor="">
          Habitaciones
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
          <input name="wifi" type="checkbox" />
        </label>

        <label htmlFor="">
          Aire Acondicionado
          <input name="airConditioner" type="checkbox" />
        </label>
        <button type="submit">Buscar</button>
        <br />
        <br />
        <button onClick={reset}>Limpiar filtros</button>
      </form>
    </>
  );
};

export default Searcher;
