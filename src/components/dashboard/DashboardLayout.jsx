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
    <main className="relative min-h-screen bg-white scrollbar">
      <div className="w-full shadow p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <NavLink to="/dashboard" className="hidden md:flex">
          <img src={logo} alt="Logo" className="w-[50px]" />
        </NavLink>

        <Navbar />

        <div className="flex justify-end md:block">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="h-auto">
        <Outlet />
      </div>
    </main>
  );
}
