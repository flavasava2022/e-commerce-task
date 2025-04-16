import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { useTranslation } from "react-i18next";
import { p, span } from "motion/react-client";
import toast from "react-hot-toast";

export default function Summary({ cartTotal, cart, isRTL, numberFormatter }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state?.auth?.user);
  const handleCheckout = () => {
    if (cartTotal === 0) {
      toast.error("You need to add Items To Basket");
    } else {
      dispatch(
        placeOrder({
          id: Date.now(),
          userId: user?.id,
          items: cart,
          total: cartTotal,
          status: [{ status: "pending", date: new Date().toISOString() }],
          date: new Date().toISOString(),
        })
      );
      dispatch(clearCart());
    }
  };
  return (
    <div className="md:w-[30%] md:min-w-[250px] w-full  p-4 flex flex-col gap-4 md:gap-8 rounded-xl shadow">
      <p className=" text-xl font-semibold text-primary text-center">
        {t("cart.total")}
      </p>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">{t("cart.subtotal")}</p>
        <p className="text-secondary">
          {isRTL === "ltr" && <span>$</span>}{" "}
          {numberFormatter.format(cartTotal?.toFixed(2))}{" "}
          {isRTL === "rtl" && <span>$</span>}
        </p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">{t("cart.shipping")}</p>
        <p className="text-secondary">{t("cart.free")}</p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">{t("cart.discount")}</p>
        <p className="text-secondary">0%</p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">{t("cart.total")}</p>
        <p className="text-secondary">
          {" "}
          {isRTL === "ltr" && <span>$</span>}{" "}
          {numberFormatter.format(cartTotal?.toFixed(2))}{" "}
          {isRTL === "rtl" && <span>$</span>}
        </p>
      </div>
      <Link className="w-[95%] mx-auto ">
        <button
          disabled={cartTotal === 0}
          onClick={handleCheckout}
          type="primary"
          className={`w-full bg-primary rounded-md p-2 text-white cursor-pointer font-[inter] ${
            cartTotal === 0 ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          {t("cart.checkout")}
        </button>
      </Link>
    </div>
  );
}
