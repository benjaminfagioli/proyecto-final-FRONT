const URL_BASE = import.meta.env.VITE_URL_BASE;
const getAllRooms = async (set) => {
  try {
    const data = await fetch(`${URL_BASE}/rooms/search`);
    const results = await data.json();
    if (!set) return results;
    set(results);
  } catch (error) {
    console.log(error.message);
  }
};
export default getAllRooms;
