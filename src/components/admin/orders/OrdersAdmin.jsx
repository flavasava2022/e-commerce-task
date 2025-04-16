import { HardDrive, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import OrdersTable from "../../orders/OrdersTable";
import Drawer from "../../common/Drawer";

import { AnimatePresence } from "motion/react";
import OrdersFilter from "./OrdersFilter";

export default function OrdersAdmin() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    userNumber: "",
  });
  const orders = useSelector((state) => state?.orders);
  console.log(orders);
  const user = useSelector((state) => state.auth.user);
  const filteredOrders = orders?.filter((product) => {
    const matchesUsers =
      !filters.userNumber ||
      Number(product?.userId) === Number(filters?.userNumber);

    const matchesStatus =
      !filters.status ||
      product?.status[product?.status?.length - 1]?.status?.toLowerCase() ===
        filters?.status?.toLowerCase();

    return matchesUsers && matchesStatus;
  });
  const { t } = useTranslation();
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
      </div>
      {filteredOrders.length === 0 ? (
        <div className="text-center py-5 flex items-center justify-center gap-2 flex-col min-h-[35vh]">
          <HardDrive className="text-gray-300" size={65} />
          <p className="font-bold text-gray-300">{t("cart.empty")}</p>
        </div>
      ) : (
        <div className="grow max-h-[40vh] overflow-auto">
          <OrdersTable orders={filteredOrders} role={user?.role} />
        </div>
      )}

      <AnimatePresence>
        {filterIsOpen && (
          <Drawer setIsOpen={setFilterIsOpen} title={t("products.filter")}>
            <OrdersFilter setFilters={setFilters} filters={filters} />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}
