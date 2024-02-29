import App from "../App";
import RoomView from "../views/RoomView";

export const routes = [
  {
    Path: "/",
    Element: App,
  },
  {
    ///Path: "/login",
    //Element: Login,
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
