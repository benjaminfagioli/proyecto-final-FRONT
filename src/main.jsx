import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import { routes } from "./routes/routes.js";
import RootLayout from "./components/layout.jsx";
import ProtectedAdminRoute from "./routes/protectedAdminRoutes.jsx";
import AdminView from "./views/AdminView.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {routes.map(({ Path, Element }) => {
        return (
          <Route
            path={Path}
            key={Path}
            element={
              <>
                <ScrollToTop />
                <Element />
              </>
            }
          />
        );
      })}
      <Route path="*" Component={Error} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <ScrollToTop />
            <AdminView />
          </ProtectedAdminRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
