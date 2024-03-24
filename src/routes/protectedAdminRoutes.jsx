import { Navigate } from "react-router-dom";
import { ADMIN_KEY } from "../config/config";

const ProtectedAdminRoute = ({ children }) => {
  const authToken = localStorage.getItem("token-Auth");
  if (authToken === ADMIN_KEY) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};
export default ProtectedAdminRoute;
