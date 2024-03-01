import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes/routes.js";
import RootLayout from "./components/layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {routes.map(({ Path, Element }) => {
        return <Route path={Path} key={Path} Component={Element} />;
      })}
      <Route path="*" Component={Error} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
