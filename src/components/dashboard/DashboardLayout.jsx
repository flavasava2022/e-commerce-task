import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import LanguageSwitcher from "../common/LanguageSwitcher";
import logo from "../../assets/home-schooling-color-icon.svg";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const user = useSelector((state) => state?.auth?.isAuthenticated);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <main className="relative scrollbar  min-h-screen bg-white">
      <div className="flex items-center justify-between w-full p-2 shadow">
        <NavLink to="/dashboard" className="hidden md:flex">
          <img src={logo} alt="" className="w-[50px]" />
        </NavLink>

        <Navbar />

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="h-auto">
        {" "}
        <Outlet />
      </div>
    </main>
  );
}
