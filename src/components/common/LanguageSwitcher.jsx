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
    <div className="flex items-center justify-center gap-2">
      <p
        onClick={() => changeLanguage("en")}
        className={`${
          i18n?.language === "en" ? "font-bold text-primary" : ""
        } cursor-pointer`}
      >
        English
      </p>
      <p
        onClick={() => changeLanguage("ar")}
        className={`${
          i18n?.language === "ar" ? "font-bold text-primary" : ""
        } cursor-pointer`}
      >
        العربية
      </p>
    </div>
  );
};

export default LanguageSwitcher;
