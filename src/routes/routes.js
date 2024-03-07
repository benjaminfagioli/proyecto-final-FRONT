import App from "../App";
import AdminView from "../views/AdminView";
import FormRegister from "../views/FormRegister";
import LoginView from "../views/LoginView";
import ProfileView from "../views/ProfileView";
import RoomView from "../views/RoomView";

export const routes = [
  {
    Path: "/",
    Element: App,
  },
  {
    Path: "/register",
    Element: FormRegister,
  },
  {
    Path: "/signup",
    Element: LoginView,
  },
  {
    Path: "/admin",
    Element: AdminView,
  },
  {
    Path: "/room/:number",
    Element: RoomView,
  },
  {
    Path: "/profile",
    Element: ProfileView,
  },
];
