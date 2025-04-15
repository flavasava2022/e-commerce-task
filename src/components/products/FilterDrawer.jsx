import React from "react";
import { useDispatch } from "react-redux";

export default function FilterDrawer({ setFilters, filters }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          PRICE
        </p>
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border-1 border-black rounded-lg outline-0"
          onChange={(e) =>
            dispatch(setFilters({ ...filters, searchTerm: e.target.value }))
          }
          value={filters?.searchTerm}
        />
      </div>
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          Category
        </p>
        <select
          onChange={(e) =>
            dispatch(setFilters({ ...filters, category: e.target.value }))
          }
          value={filters?.category}
          className="p-2 border-1 border-black rounded-lg outline-0"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Shoes">Shoes</option>
          <option value="Furniture">Furniture</option>
          <option value="Jewelry">Jewelry</option>
        </select>
      </div>
    </div>
  );
}
