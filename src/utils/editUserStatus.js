import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const updateUserStatus = async (userId, isActive) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `${URL_BASE}/users/editUserStatus/${userId}`,
      { isActive: isActive },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error habilitando usuario:", error);
    return false;
  }
};

export default updateUserStatus;
