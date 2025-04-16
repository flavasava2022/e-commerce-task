import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../components/common/Drawer";
import { motion, AnimatePresence } from "framer-motion";
import FilterDrawer from "../../components/products/FilterDrawer";
import { LayoutGrid, SlidersHorizontal, StretchHorizontal } from "lucide-react";
import Pagination from "../../components/products/Pagination";
import { useTranslation } from "react-i18next";
import ProductCard from "../../components/products/ProductCard";

export default function Products() {
  const { t } = useTranslation();

  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [layout, setLayout] = useState("grid");
  const { products } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({
    category: "",
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
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
  const totalPages = Math.ceil(filteredProducts?.length / 10);
  const start = (currentPage - 1) * 10;
  const currentProducts = filteredProducts.slice(start, start + 10);
  return (
    <div className="p-2 flex flex-col items-center justify-between w-[90%] mx-auto gap-2 mt-2">
      <div className="flex w-full items-center justify-between h-[3rem]">
        {" "}
        <button
          onClick={() => setFilterIsOpen(true)}
          className=" text-white flex items-center justify-center gap-2 cursor-pointer p-1"
        >
          <SlidersHorizontal className="p-2 bg-primary rounded-md w-[32px] h-[32px] md:h-full md:w-full" />{" "}
          <p className="text-black  font-semibold">{t("products.filter")}</p>
        </button>
        <div className="flex items-center justify-between gap-2 h-full p-1">
          <motion.button
            onClick={() => setLayout("grid")}
            className=" text-primary p-1 rounded-lg h-full cursor-pointer"
            animate={{
              background:
                layout === "grid" ? "var(--color-primary)" : "rgba(0, 0, 0, 0)",
              color:
                layout === "grid"
                  ? "var(--color-white)"
                  : "var(--color-primary)",
            }}
          >
            <LayoutGrid className="w-[32px] h-[32px] md:h-full md:w-full" />
          </motion.button>

          <motion.button
            onClick={() => setLayout("flex")}
            className=" text-primary p-1 rounded-lg h-full cursor-pointer"
            animate={{
              background:
                layout === "flex" ? "var(--color-primary)" : "rgba(0, 0, 0, 0)",
              color:
                layout === "flex"
                  ? "var(--color-white)"
                  : "var(--color-primary)",
            }}
          >
            <StretchHorizontal className="w-[32px] h-[32px] md:h-full md:w-full" />
          </motion.button>
        </div>
      </div>
      <div
        className={`${
          layout === "grid" ? "product-grid" : "flex flex-col gap-2 "
        } w-full  max-h-[74vh] overflow-auto content-between`}
      >
        {currentProducts?.map((product) => (
          <ProductCard product={product} layout={layout} key={product?.id} />
        ))}
      </div>
      {filteredProducts.length > 10 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
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
