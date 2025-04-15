import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <nav className="flex gap-2">
      <NavLink
        end={true}
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "text-primary p-2 font-semibold border-b-2"
            : "text-black p-2 font-semibold"
        }
      >
        {t("header.products")}
      </NavLink>
      <NavLink
        to="dashboard/cart"
        className={({ isActive }) =>
          isActive
            ? "text-primary p-2 font-semibold border-b-2"
            : "text-black p-2 font-semibold"
        }
      >
        {t("header.cart")}
      </NavLink>
      <NavLink
        to="dashboard/orders"
        className={({ isActive }) =>
          isActive
            ? "text-primary p-2 font-semibold border-b-2"
            : "text-black p-2 font-semibold"
        }
      >
        {t("header.orders")}
      </NavLink>
      {user.role === "admin" && (
        <NavLink
          to="/dashboard/admin"
          className={({ isActive }) =>
            isActive
              ? "text-primary p-2 font-semibold border-b-2"
              : "text-black p-2 font-semibold"
          }
        >
          {t("header.admin")}
        </NavLink>
      )}
      <button
        className="text-black p-2 font-semibold cursor-pointer"
        onClick={() => {
          dispatch(logout());
        }}
      >
        {t("header.logout")}
      </button>
    </nav>
  );
}
