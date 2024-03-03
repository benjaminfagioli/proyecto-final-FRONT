import App from "../App";
import FormRegister from "../views/FormRegister";
import RoomView from "../views/RoomView";

export const routes = [
  {
    Path: "/",
    Element: App,
  },
  {
    Path: "/Register",
    Element: FormRegister,
  },
  {
    //Path: "/signup",
    //Element: SignUp,
  },
  {
    //Path: "/error",
    //Element: Eror,
  },
  {
    //Path: "/admin",
  },
  {
    Path: "/room/:number",
    Element: RoomView,
  },
];
