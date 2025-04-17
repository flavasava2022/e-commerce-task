import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isRTL = i18n.dir() === "rtl";
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;
  const numberFormatter = new Intl.NumberFormat(locale);
  const product = useSelector((state) => state?.products?.products).find(
    (product) => product.id.toString() === id
  );

  if (!product)
    return (
      <p className="p-4 w-full text-center mt-8">{t("products.noProducts")}</p>
    );

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      <img
        src={product?.image}
        alt={product.name}
        className="w-full md:w-1/2 h-auto rounded-xl shadow"
      />

      <div className="flex flex-col gap-4 md:w-1/2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-muted">
          {t("products.category")}:{" "}
          {t(`products.${product.category?.toLowerCase()}`)}
        </p>
        <p className="text-lg text-primary font-semibold">
          {isRTL ? "" : "$"}
          {numberFormatter.format(product.price.toFixed(2))}
          {isRTL ? "$" : ""}
        </p>
        <p>{product.description}</p>

        <button
          className="bg-primary text-white py-2 px-4 rounded-xl w-fit cursor-pointer"
          onClick={() => dispatch(addToCart(product))}
        >
          {t("products.addToCart")}
        </button>
      </div>
    </div>
  );
}
