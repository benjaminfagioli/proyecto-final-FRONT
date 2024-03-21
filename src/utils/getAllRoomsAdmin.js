const URL_BASE = import.meta.env.VITE_URL_BASE;

const getAllRooms = async (set) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${URL_BASE}/rooms/allRooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const results = await response.json();
    if (!set) return results;
    set(results);
  } catch (error) {
    console.error(error.message);
  }
};

export default getAllRooms;
