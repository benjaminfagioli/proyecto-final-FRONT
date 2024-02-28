import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";

const layout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default layout;
