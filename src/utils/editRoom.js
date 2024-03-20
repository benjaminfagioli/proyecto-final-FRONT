import axios from "axios";
const URL_BASE = import.meta.env.VITE_URL_BASE;

const editRoom = async (roomId, updatedRoomData) => {
  console.log(updatedRoomData);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${URL_BASE}/rooms/editRoom/${roomId}`,
      updatedRoomData,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing room:", error);
    throw new Error("Hubo un error al editar la habitación.");
  }
};

export default editRoom;
