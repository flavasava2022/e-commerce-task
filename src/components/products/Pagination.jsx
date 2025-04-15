import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir();
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;

  const numberFormatter = new Intl.NumberFormat(locale);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = isRTL === "rtl" ? pageNumbers : [...pageNumbers].reverse();

  return (
    <div
      className={`flex justify-center mt-6 gap-2 ${
        isRTL === "ltr" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <button
        className="disabled:opacity-50 text-primary cursor-pointer"
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
      >
        <ChevronRight size={32} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded-md cursor-pointer ${
            currentPage === page ? "bg-primary text-white" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {numberFormatter.format(page)}
        </button>
      ))}

      <button
        className="disabled:opacity-50 text-primary cursor-pointer"
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronLeft size={32} />
      </button>
    </div>
  );
}
