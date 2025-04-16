import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  document.body.classList.toggle("rtl", i18n.language === "ar");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lng === "ar");
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n?.language}
      className="p-2 border-1 border-gray-300 rounded-lg outline-0"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSwitcher;
