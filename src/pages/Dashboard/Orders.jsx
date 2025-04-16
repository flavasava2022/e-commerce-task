import React from "react";
import { useSelector } from "react-redux";
import OrdersTable from "../../components/orders/OrdersTable";
import { HardDrive, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const user = useSelector((state) => state?.auth?.user);
  const orders = useSelector((state) => state?.orders).filter(
    (order) => order?.userId === user?.id
  );
  const { t } = useTranslation();
  return (
    <div className="p-2 w-full shadow rounded-xl min-h-[46vh] md:w-[80%] mx-auto md:mt-12">
      <div className="flex items-center gap-2 w-full p-4 ">
        <p className="font-bold text-primary">{t("orders.title")}</p>
      </div>
      {orders?.length === 0 ? (
        <div className="text-center py-5 flex items-center justify-center gap-2 flex-col min-h-[35vh]">
          <HardDrive className="text-gray-300" size={65} />
          <p className="font-bold text-gray-300">{t("cart.empty")}</p>
        </div>
      ) : (
        <div className="grow overflow-auto">
          <OrdersTable orders={orders} />
        </div>
      )}
    </div>
  );
}
