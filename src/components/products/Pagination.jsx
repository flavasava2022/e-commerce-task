import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        className="disabled:opacity-50 text-primary cursor-pointer"
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={32} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded-md cursor-pointer ${
            currentPage === i + 1 ? "bg-primary text-white" : ""
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="disabled:opacity-50 text-primary cursor-pointer"
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
