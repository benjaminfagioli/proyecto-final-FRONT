const getProfile = async () => {
  setisLoading(true);
  try {
    const userFound = await axios.get(`${URL_BASE}/users/profile`, {
      headers: {
        "auth-token": token,
      },
    });
    setUser(userFound.data);
  } catch (error) {
    console.error(error);
  } finally {
    setisLoading(false);
  }
};

export default getProfile;
