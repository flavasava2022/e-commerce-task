import { useSelector } from "react-redux";

import Table from "../../components/cart/Table";
import { HardDrive, ShoppingCart } from "lucide-react";
import Summary from "../../components/cart/Summary";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir();
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;

  const numberFormatter = new Intl.NumberFormat(locale);
  return (
    <div
      className={`p-2 md:mt-8 flex items-start justify-between gap-4 flex-wrap md:flex-nowrap`}
    >
      <div className="p-2 w-full shadow rounded-xl min-h-[46vh]">
        <div className="flex items-center gap-2 w-full p-4 ">
          <ShoppingCart className="text-primary" />
          <p className="font-bold text-primary">{t("cart.title")}</p>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-5 flex items-center justify-center gap-2 flex-col min-h-[35vh]">
            <HardDrive className="text-gray-300" size={65} />
            <p className="font-bold text-gray-300">{t("cart.empty")}</p>
          </div>
        ) : (
          <div className="grow ">
            <Table
              cart={cart}
              isRTL={isRTL}
              numberFormatter={numberFormatter}
            />
          </div>
        )}
      </div>

      <Summary
        cartTotal={total}
        cart={cart}
        isRTL={isRTL}
        numberFormatter={numberFormatter}
      />
    </div>
  );
}
