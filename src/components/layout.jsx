import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
