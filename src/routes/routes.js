import App from "../App";
import ContactoForm from "../components/formContact.jsx";
import AdminView from "../views/AdminView";
import FormRegister from "../views/FormRegister";
import ImagesView from "../views/ImagesView.jsx";
import LoginView from "../views/LoginView";
import ProfileView from "../views/ProfileView";
import RoomView from "../views/RoomView";
import SobreNosotros from "../views/SobreNosotros.jsx";

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
  {
    Path: "/aboutUs",
    Element: SobreNosotros,
  },
  { Path: "/gallery", Element: ImagesView },
  {
    Path: "/contacto",
    Element: ContactoForm,
  },
];
