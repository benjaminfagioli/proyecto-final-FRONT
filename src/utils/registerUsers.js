import axios from "axios";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${URL_BASE}/users/createUser`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.errors?.length > 0)
      throw new Error(error.response.data.errors.map((e) => e.msg));
    throw new Error(error.message);
  }
};

export default registerUser;
