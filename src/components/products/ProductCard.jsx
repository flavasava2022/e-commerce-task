import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

export default function ProductCard({ product, layout }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  return (
    <div
      className={`product-card flex gap-4 p-2 rounded-lg shadow-sm border ${
        layout === "grid"
          ? "flex-col justify-between w-full max-w-xs"
          : "flex-row items-start w-full"
      }`}
    >
      <img
        src={product?.image}
        alt=""
        className={`rounded-lg object-cover ${
          layout === "grid"
            ? "w-full h-[15vh]"
            : "w-[120px] h-[120px] flex-shrink-0 my-auto"
        }`}
      />

      <div className="flex flex-col justify-between gap-2 w-full h-full">
        <div>
          <h3 className="text-base font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">${product.price}</p>
        </div>

        <button
          className={`w-full text-white rounded-md p-2 font-[inter] ${
            Number(product?.stock) === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary cursor-pointer"
          }`}
          onClick={() => dispatch(addToCart(product))}
          disabled={Number(product?.stock) === 0}
        >
          {Number(product?.stock) === 0
            ? t("products.outOfStock")
            : t("products.addToCart")}
        </button>

        <Link to={`/dashboard/product/${product?.id}`} className="w-full">
          <button className="bg-secondary rounded-md p-2 text-white w-full font-[inter]">
            {t("orders.seeDetails")}
          </button>
        </Link>
      </div>
    </div>
  );
}
