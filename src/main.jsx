import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes/routes.js";
import layout from "./components/layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<layout />}>
      {routes.map(({ Path, Element }) => (
        <Route path={Path} element={<Element />} />
      ))}
      <Route path="*" element={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
