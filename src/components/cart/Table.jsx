import React from "react";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import clothesDemo from "../../assets/clothes.jpg";
import electronicsDemo from "../../assets/electronics.jpg";
import furnitureDemo from "../../assets/furniture.jpg";
import jewelryDemo from "../../assets/jewelry.jpg";
import mobileDemo from "../../assets/mobile.jpg";
import shoesDemo from "../../assets/shoes.jpg";

const categoryImages = {
  clothes: clothesDemo,
  electronics: electronicsDemo,
  furniture: furnitureDemo,
  jewelry: jewelryDemo,
  mobile: mobileDemo,
  shoes: shoesDemo,
};

export default function Table({ cart, isRTL, numberFormatter }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-[12px] md:text-[16px]">
          <thead>
            <tr className="bg-primary text-white uppercase">
              <th className="p-2 text-center">{t("cart.product")}</th>
              <th className="text-center">{t("cart.quantity")}</th>
              <th className="text-center">{t("cart.price")}</th>
              <th className="text-center">{t("cart.subtotal")}</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={categoryImages[item?.category?.toLowerCase()]}
                      className="w-[60px] h-[60px] hidden md:block object-cover"
                      alt=""
                    />
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">
                        SKU: {numberFormatter.format(item.id)}
                      </small>
                    </div>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <div className="flex items-center justify-center">
                    <button
                      className={`cursor-pointer bg-primary ${
                        isRTL === "ltr" ? "rounded-l-2xl" : "rounded-r-2xl"
                      } p-1 text-white`}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-primary text-[18px] px-2">
                      {numberFormatter.format(item.quantity)}
                    </span>
                    <button
                      className={`cursor-pointer bg-primary ${
                        isRTL === "ltr" ? "rounded-r-2xl" : "rounded-l-2xl"
                      } p-1 text-white`}
                      onClick={() => dispatch(addToCart(item))}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </td>
                <td className="text-center align-middle">
                  {isRTL === "ltr" && "$"}
                  {numberFormatter.format(item.price.toFixed(2))}
                  {isRTL === "rtl" && "$"}
                </td>
                <td className="text-center align-middle font-bold">
                  {isRTL === "ltr" && "$"}
                  {numberFormatter.format(
                    (item.price * item.quantity).toFixed(2)
                  )}
                  {isRTL === "rtl" && "$"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex gap-4 items-center">
              <img
                src={categoryImages[item?.category?.toLowerCase()]}
                className="w-20 h-20 object-cover rounded"
                alt=""
              />
              <div>
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-muted">
                  SKU: {numberFormatter.format(item.id)}
                </small>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>{t("cart.quantity")}:</span>
              <div className="flex items-center">
                <button
                  className={`cursor-pointer bg-primary ${
                    isRTL === "ltr" ? "rounded-l-2xl" : "rounded-r-2xl"
                  } p-1 text-white`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <Minus size={18} />
                </button>
                <span className="text-primary text-[18px] px-2">
                  {numberFormatter.format(item.quantity)}
                </span>
                <button
                  className={`cursor-pointer bg-primary ${
                    isRTL === "ltr" ? "rounded-r-2xl" : "rounded-l-2xl"
                  } p-1 text-white`}
                  onClick={() => dispatch(addToCart(item))}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span>{t("cart.price")}:</span>
              <span>
                {isRTL === "ltr" && "$"}
                {numberFormatter.format(item.price.toFixed(2))}
                {isRTL === "rtl" && "$"}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold">
              <span>{t("cart.subtotal")}:</span>
              <span>
                {isRTL === "ltr" && "$"}
                {numberFormatter.format(
                  (item.price * item.quantity).toFixed(2)
                )}
                {isRTL === "rtl" && "$"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
