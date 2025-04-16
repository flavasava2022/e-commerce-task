import React from "react";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Table({ cart, isRTL, numberFormatter }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <table className="w-full text-[12px] md:text-[16px]">
      <thead>
        <tr className=" bg-primary text-white  uppercase">
          <th className=" p-2 text-center">{t("cart.product")}</th>
          <th className="text-center ">{t("cart.quantity")}</th>
          <th className="text-center ">{t("cart.price")}</th>
          <th className="text-center">{t("cart.subtotal")}</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id} className="">
            <td className="p-2">
              <div className="flex items-center gap-2">
                <div
                  className="me-3 md:block hidden"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                  }}
                >
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted ">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-muted">
                    SKU: {numberFormatter.format(item.id)}
                  </small>
                </div>
              </div>
            </td>
            <td className="text-center align-middle ">
              <div className="flex items-center justify-center align-items-center">
                <button
                  className={`cursor-pointer bg-primary ${
                    isRTL === "ltr" ? "rounded-l-2xl" : "rounded-r-2xl"
                  } p-1 flex items-center justify-center  text-white`}
                  onClick={() => {
                    dispatch(removeFromCart(item?.id));
                  }}
                >
                  <Minus size={18} />
                </button>
                <span className="text-primary  text-[18px] px-2">
                  {numberFormatter.format(item.quantity)}
                </span>
                <button
                  className={`cursor-pointer bg-primary ${
                    isRTL === "ltr" ? "rounded-r-2xl" : "rounded-l-2xl"
                  } p-1 flex items-center justify-center  text-white`}
                  onClick={() => {
                    dispatch(addToCart(item));
                  }}
                >
                  <Plus size={18} />
                </button>
              </div>
            </td>
            <td className="text-center align-middle ">
              {isRTL === "ltr" && <span>$</span>}{" "}
              {numberFormatter.format(item.price.toFixed(2))}{" "}
              {isRTL === "rtl" && <span>$</span>}
            </td>
            <td className="text-center align-middle fw-bold ">
              {isRTL === "ltr" && <span>$</span>}{" "}
              {numberFormatter.format((item.price * item.quantity).toFixed(2))}{" "}
              {isRTL === "rtl" && <span>$</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
