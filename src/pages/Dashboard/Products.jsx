import React, { useEffect, useState } from "react";
import { setFilters } from "../../store/productsSlice";
import { addToCart } from "../../store/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../components/common/Drawer";
import { motion, AnimatePresence } from "framer-motion";
import FilterDrawer from "../../components/products/FilterDrawer";
import { LayoutGrid, SlidersHorizontal, StretchHorizontal } from "lucide-react";
import Pagination from "../../components/products/Pagination";

export default function Products() {
  const dispatch = useDispatch();
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [layout, setLayout] = useState("grid");
  const { products, filters } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(filters?.searchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(filters?.searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });
  const totalPages = Math.ceil(filteredProducts?.length / 10);
  const start = (currentPage - 1) * 10;
  const currentProducts = filteredProducts.slice(start, start + 10);
  console.log(start);
  return (
    <div className="p-2 flex flex-col items-center justify-between w-[90%] mx-auto gap-2">
      <div className="flex w-full items-center justify-between">
        {" "}
        <button
          onClick={() => setFilterIsOpen(true)}
          className="p-2 text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal
            className="p-2 bg-primary rounded-md text-[18px]"
            size={35}
          />{" "}
          <p className="text-black text-[22px] font-semibold">Filter</p>
        </button>
        <div>
          <div className="flex items-center justify-between gap-2">
            <motion.button
              onClick={() => setLayout("grid")}
              className="bg-transparent text-primary p-1 rounded-lg"
              animate={{
                background:
                  layout === "grid" ? "var(--color-primary)" : "transparent",
                color:
                  layout === "grid"
                    ? "var(--color-white)"
                    : "var(--color-primary)",
              }}
            >
              <LayoutGrid size={32} />
            </motion.button>

            <motion.button
              onClick={() => setLayout("flex")}
              className="bg-transparent text-primary p-1 rounded-lg"
              animate={{
                background:
                  layout === "flex" ? "var(--color-primary)" : "transparent",
                color:
                  layout === "flex"
                    ? "var(--color-white)"
                    : "var(--color-primary)",
              }}
            >
              <StretchHorizontal size={32} />
            </motion.button>
          </div>
        </div>
      </div>
      <div
        className={`${
          layout === "grid" ? "product-grid" : "flex flex-col gap-2"
        } w-full`}
      >
        {currentProducts?.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
            {user?.role === "admin" && <></>}
          </div>
        ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <AnimatePresence>
        {filterIsOpen && (
          <Drawer setIsOpen={setFilterIsOpen} title="Filter">
            <FilterDrawer setFilters={setFilters} filters={filters} />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
