import { HardDrive, SlidersHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../store/productsSlice";
import AddProductModal from "./AddProductModal";
import EditProductBtn from "./EditProductBtn";
import { AnimatePresence } from "motion/react";
import Drawer from "../../common/Drawer";
import FilterDrawer from "../../products/FilterDrawer";
import clothesDemo from "../../../assets/clothes.jpg";
import electronicsDemo from "../../../assets/electronics.jpg";
import furnitureDemo from "../../../assets/furniture.jpg";
import jewelryDemo from "../../../assets/jewelry.jpg";
import mobileDemo from "../../../assets/mobile.jpg";
import shoesDemo from "../../../assets/shoes.jpg";

const categoryImages = {
  clothes: clothesDemo,
  electronics: electronicsDemo,
  furniture: furnitureDemo,
  jewelry: jewelryDemo,
  mobile: mobileDemo,
  shoes: shoesDemo,
};

export default function ProductsAdmin() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [addProductIsOpen, setAddProductIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    searchTerm: "",
  });

  const products = useSelector((state) => state?.products?.products);
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(filters?.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters?.searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || product.category === filters.category;

    return matchesSearch && matchesCategory;
  });

  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir();
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;
  const numberFormatter = new Intl.NumberFormat(locale);

  return (
    <div className="max-h-[80vh] overflow-auto">
      <div className="flex items-center justify-between w-full gap-2">
        <button
          onClick={() => setFilterIsOpen(true)}
          className="text-white flex items-center justify-center gap-2 cursor-pointer p-1"
        >
          <SlidersHorizontal className="p-2 bg-primary rounded-md w-[32px] h-[32px]" />
          <p className="text-black font-semibold">{t("products.filter")}</p>
        </button>
        <p className="hidden md:block">
          {t("admin.totalProducts")} : {products?.length}
        </p>
        <button
          onClick={() => setAddProductIsOpen(true)}
          className="bg-primary rounded-md p-2 px-8 text-white cursor-pointer"
        >
          {t("admin.addNewProduct")}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block mt-2 overflow-x-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 flex items-center justify-center gap-2 flex-col min-h-[35vh]">
            <HardDrive className="text-gray-300" size={65} />
            <p className="font-bold text-gray-300">{t("cart.empty")}</p>
          </div>
        ) : (
          <table className="w-full text-[12px] md:text-[16px]">
            <thead>
              <tr className="bg-primary text-white uppercase">
                <th className="p-2 text-center">{t("cart.product")}</th>
                <th className="text-center">{t("products.description")}</th>
                <th className="text-center">{t("products.price")}</th>
                <th className="text-center">{t("products.stock")}</th>
                <th className="text-center">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={categoryImages[item?.category?.toLowerCase()]}
                        alt=""
                        className="w-[60px] h-[60px] hidden md:block"
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
                    {item?.description}
                  </td>
                  <td className="text-center align-middle">
                    {isRTL === "ltr" && <span>$</span>}{" "}
                    {numberFormatter.format(item.price.toFixed(2))}{" "}
                    {isRTL === "rtl" && <span>$</span>}
                  </td>
                  <td className="text-center align-middle">
                    {numberFormatter.format(item.stock)}
                  </td>
                  <td className="align-middle">
                    <div className="flex items-center gap-2 justify-center w-full">
                      <EditProductBtn product={item} />
                      <button
                        onClick={() =>
                          dispatch(
                            deleteProduct({ id: item?.id, name: item?.name })
                          )
                        }
                      >
                        <Trash2 className="text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="md:hidden mt-4 space-y-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={categoryImages[item?.category?.toLowerCase()]}
                alt=""
                className="w-[60px] h-[60px] rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold">{item.name}</span>
                <small className="text-gray-500">
                  SKU: {numberFormatter.format(item.id)}
                </small>
              </div>
            </div>
            <p className="text-sm text-gray-700">{item.description}</p>
            <div className="flex justify-between text-sm">
              <span>{t("products.price")}:</span>
              <span>
                {isRTL === "ltr" && "$"}
                {numberFormatter.format(item.price.toFixed(2))}
                {isRTL === "rtl" && "$"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t("products.stock")}:</span>
              <span>{numberFormatter.format(item.stock)}</span>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <EditProductBtn product={item} />
              <button
                onClick={() =>
                  dispatch(deleteProduct({ id: item?.id, name: item?.name }))
                }
              >
                <Trash2 className="text-danger" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {addProductIsOpen && (
        <AddProductModal onClose={() => setAddProductIsOpen(false)} />
      )}
      <AnimatePresence>
        {filterIsOpen && (
          <Drawer setIsOpen={setFilterIsOpen} title={t("products.filter")}>
            <FilterDrawer setFilters={setFilters} filters={filters} />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
