const URL_BASE = import.meta.env.VITE_URL_BASE;
const getRooms = async (set) => {
  try {
    const data = await fetch(`${URL_BASE}/rooms/allrooms`);
    const results = await data.json();
    console.log(results);
    set(results);
  } catch (error) {
    console.log(error.message);
  }
};
export default getRooms;
