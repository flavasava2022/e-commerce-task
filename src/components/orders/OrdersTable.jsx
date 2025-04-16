import React from "react";

import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Eye, Pencil } from "lucide-react";
import EditStatusBtn from "./EditStatusBtn";
import ViewStatusBtn from "./ViewStatusBtn";

export default function OrdersTable({ orders, role = "user" }) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir();
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;
  const numberFormatter = new Intl.NumberFormat(locale);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  });
  const statusColors = {
    pending: "bg-secondary-300",
    processing: "bg-primary-300",
    shipped: "bg-danger-300",
    delivered: "bg-success-300",
  };
  return (
    <table className="w-full text-[12px] md:text-[16px] ">
      <thead>
        <tr className=" bg-primary text-white  uppercase">
          <th className=" p-2 text-center">{t("orders.items")}</th>
          <th className="text-center ">{t("orders.date")}</th>
          <th className="text-center ">{t("orders.status")}</th>
          <th className="text-center">{t("cart.total")}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="">
            <td className="p-2">
              <div className="flex items-center gap-2 w-full justify-center">
                {numberFormatter.format(order?.items?.length)}
              </div>
            </td>
            <td className="text-center align-middle ">
              {formattedDate.format(new Date(order?.date))}
            </td>
            <td className="flex items-center justify-center p-2 gap-4">
              <p
                className={`${
                  statusColors[order?.status[order?.status?.length - 1].status]
                } px-4 p-1 rounded-xl w-fit text-white uppercase`}
              >
                {" "}
                {t(`orders.${order?.status[order?.status?.length - 1].status}`)}
              </p>

              <ViewStatusBtn order={order} />

              {role === "admin" && <EditStatusBtn order={order} />}
            </td>
            <td className="text-center align-middle fw-bold ">
              {isRTL === "ltr" && <span>$</span>}{" "}
              {numberFormatter.format(order?.total.toFixed(2))}{" "}
              {isRTL === "rtl" && <span>$</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
