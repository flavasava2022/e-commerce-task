import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function FilterDrawer({ setFilters, filters }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          {t("products.search")}
        </p>
        <input
          type="text"
          placeholder={t("products.searchPlaceholder")}
          className="p-2 border-1 border-gray-300  rounded-lg outline-0"
          onChange={(e) =>
            setFilters((prevState) => {
              return { ...prevState, searchTerm: e.target.value };
            })
          }
          value={filters?.searchTerm}
        />
      </div>
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          {t("products.category")}
        </p>
        <select
          onChange={(e) =>
            setFilters((prevState) => {
              return { ...prevState, category: e.target.value };
            })
          }
          value={filters?.category}
          className="p-2 border-1 border-gray-300 rounded-lg outline-0"
        >
          <option value="">{t("products.allCategories")}</option>
          <option value="Electronics">{t("products.electronics")}</option>
          <option value="Clothes">{t("products.clothes")}</option>
          <option value="Shoes">{t("products.shoes")}</option>
          <option value="Furniture">{t("products.furniture")}</option>
          <option value="Jewelry">{t("products.jewelry")}</option>
        </select>
      </div>
    </div>
  );
}
