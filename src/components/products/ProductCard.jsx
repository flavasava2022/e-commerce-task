import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
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
export default function ProductCard({ product, layout }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  return (
    <div
      className={`product-card h-[40vh] md:h-[37vh] flex ${
        layout === "grid" ? "flex-col justify-between" : "justify-start"
      } gap-2 items-center `}
    >
      <img
        src={categoryImages[product?.category?.toLowerCase()]}
        alt=""
        className={` bg-cover  max-h-[20vh] ${
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
      </div>
    </div>
  );
}
