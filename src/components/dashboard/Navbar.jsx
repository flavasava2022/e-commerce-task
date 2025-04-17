import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { clearCart } from "../../store/cartSlice";

export default function Navbar() {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cartTotal = useSelector((state) => state.cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <nav className="flex gap-2 text-[12px] md:text-[16px]">
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
        to="/dashboard/cart"
        className={({ isActive }) =>
          isActive
            ? "text-primary p-2 font-semibold border-b-2 flex items-center justify-center gap-2"
            : "text-black p-2 font-semibold flex items-center justify-center gap-2"
        }
      >
        {t("header.cart")}
        <span className=" rounded-full bg-primary p-2 text-white w-[20px] h-[20px]  items-center justify-center text-[12px] hidden md:flex">
          {cartTotal}
        </span>
      </NavLink>
      <NavLink
        to="/dashboard/orders"
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
          dispatch(clearCart());
        }}
      >
        {t("header.logout")}
      </button>
    </nav>
  );
}
