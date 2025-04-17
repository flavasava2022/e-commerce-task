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
      className={`product-card  flex ${
        layout === "grid" ? "flex-col justify-between" : "justify-start"
      } gap-2 items-center `}
    >
      <img
        src={product?.image}
        alt=""
        className={` object-fill max-h-full h-[15vh] max-w-full  ${
          layout === "grid" ? "w-[90%]" : ""
        }`}
      />

      <div className="w-full flex items-center justify-between gap-2 flex-col grow h-full">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button
          className={`w-full ${
            Number(product?.stock) === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primary cursor-pointer"
          } rounded-md p-2 text-white  font-[inter]`}
          onClick={() => dispatch(addToCart(product))}
          disabled={Number(product?.stock) === 0}
        >
          {Number(product?.stock) === 0
            ? t("products.outOfStock")
            : t("products.addToCart")}
        </button>
        <Link to={`/dashboard/product/${product?.id}`} className="w-full">
          <button className="bg-secondary cursor-pointer rounded-md p-2 text-white  font-[inter] w-full">
            {t("orders.seeDetails")}
          </button>
        </Link>
      </div>
    </div>
  );
}
