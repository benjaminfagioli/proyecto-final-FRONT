import axios from "axios";
import React from "react";
import { URL_BASE } from "../config/config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ReserveInfo = ({ from, to, userId, room }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const payload = {
      from: from,
      to: to,
      userId: userId,
      room: room,
    };
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar tu reserva?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(
            `${URL_BASE}/rooms/deleteReserve`,
            payload
          );
          if (res.status == 200) {
            Swal.fire({
              title: "Eliminada!",
              icon: "success",
            }).then(() => {
              location.reload();
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="display-inline-block">
      <span>
        {`${new Date(from).toLocaleDateString("es-ar")} al a
      ${new Date(to).toLocaleDateString("es-ar")}. `}
      </span>
      <button onClick={handleClick} className="fs-6">
        Eliminar
      </button>
    </div>
  );
};

export default ReserveInfo;
