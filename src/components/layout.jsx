import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";
import Footer from "./Footer.jsx";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
