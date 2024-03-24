import axios from "axios";
import { ADMIN_KEY, USER_KEY } from "../config/config";
const URL_BASE = import.meta.env.VITE_URL_BASE;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL_BASE}/users/createUser`, userData);
    const res = await axios.post(`${URL_BASE}/users/login`, userData);
    let fixedToken = res.data.key === ADMIN_KEY ? ADMIN_KEY : USER_KEY;
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("token-Auth", fixedToken);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.errors?.length > 0)
      throw new Error(error.response.data.errors.map((e) => e.msg));
    throw new Error(error.message);
  }
};

export default registerUser;
