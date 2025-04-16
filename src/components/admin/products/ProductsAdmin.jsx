import { HardDrive, Pencil, SlidersHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../store/productsSlice";
import { div } from "motion/react-client";
import AddProductModal from "./AddProductModal";
import EditProductBtn from "./EditProductBtn";
import { AnimatePresence } from "motion/react";
import Drawer from "../../common/Drawer";
import FilterDrawer from "../../products/FilterDrawer";

export default function ProductsAdmin({}) {
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
          className=" text-white flex items-center justify-center gap-2 cursor-pointer p-1"
        >
          <SlidersHorizontal className="p-2 bg-primary rounded-md w-[32px] h-[32px] md:h-full md:w-full" />{" "}
          <p className="text-black  font-semibold">{t("products.filter")}</p>
        </button>
        <p>
          {t("admin.totalProducts")} : {products?.length}
        </p>
        <button
          onClick={() => setAddProductIsOpen(true)}
          className="w-fit bg-primary rounded-md  p-2 px-8 text-white cursor-pointer font-[inter] "
        >
          {t("admin.addNewProduct")}
        </button>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5 flex items-center justify-center gap-2 flex-col min-h-[35vh]">
          <HardDrive className="text-gray-300" size={65} />
          <p className="font-bold text-gray-300">{t("cart.empty")}</p>
        </div>
      ) : (
        <table className="w-full text-[12px] md:text-[16px] mt-2">
          <thead>
            <tr className=" bg-primary text-white  uppercase">
              <th className=" p-2 text-center">{t("cart.product")}</th>
              <th className="text-center ">{t("products.description")}</th>
              <th className="text-center ">{t("products.price")}</th>
              <th className="text-center">{t("products.stock")}</th>
              <th className="text-center">{t("admin.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
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
                  {item?.description}
                </td>
                <td className="text-center align-middle ">
                  {isRTL === "ltr" && <span>$</span>}{" "}
                  {numberFormatter.format(item.price.toFixed(2))}{" "}
                  {isRTL === "rtl" && <span>$</span>}
                </td>
                <td className="text-center align-middle fw-bold ">
                  {isRTL === "ltr" && <span>$</span>}{" "}
                  {numberFormatter.format(item.stock.toFixed(2))}{" "}
                  {isRTL === "rtl" && <span>$</span>}
                </td>
                <td className="align-middle">
                  <div className="flex items-center gap-2 justify-center w-full ">
                    <EditProductBtn product={item} />
                    <button
                      className="cursor-pointer"
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

      {addProductIsOpen && (
        <AddProductModal
          onClose={() => {
            setAddProductIsOpen(false);
          }}
        />
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
