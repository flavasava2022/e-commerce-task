import React from "react";
import { useTranslation } from "react-i18next";
import { mockUsers } from "../../../utils/mockData";

export default function OrdersFilter({ setFilters, filters }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          {t("admin.orderStatus")}
        </p>
        <select
          onChange={(e) =>
            setFilters((prevState) => {
              return { ...prevState, status: e.target.value };
            })
          }
          value={filters?.status}
          className="p-2 border-1 border-gray-300 rounded-lg outline-0"
        >
          <option value="">{t("products.allStatus")}</option>
          <option value="pending">{t("orders.pending")}</option>
          <option value="processing">{t("orders.processing")}</option>
          <option value="shipped">{t("orders.shipped")}</option>
          <option value="delivered">{t("orders.delivered")}</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 w-[95%]">
        <p className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit">
          {t("admin.user")}
        </p>
        <select
          onChange={(e) =>
            setFilters((prevState) => {
              return { ...prevState, userNumber: e.target.value };
            })
          }
          value={filters?.userNumber}
          className="p-2 border-1 border-gray-300 rounded-lg outline-0"
        >
          <option value="">{t("products.allUsers")}</option>
          {mockUsers.map((user) => (
            <option key={user?.id} value={user?.id}>
              {user?.email}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
