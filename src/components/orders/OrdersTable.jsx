import React from "react";
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
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-[12px] md:text-[16px]">
          <thead>
            <tr className="bg-primary text-white uppercase">
              <th className="p-2 text-center">{t("orders.items")}</th>
              <th className="text-center">{t("orders.date")}</th>
              <th className="text-center">{t("orders.status")}</th>
              <th className="text-center">{t("cart.total")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const lastStatus =
                order.status?.[order.status.length - 1]?.status;
              return (
                <tr key={order.id}>
                  <td className="p-2 text-center">
                    {numberFormatter.format(order?.items?.length)}
                  </td>
                  <td className="text-center align-middle">
                    {formattedDate.format(new Date(order?.date))}
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`${statusColors[lastStatus]} px-4 py-1 rounded-xl text-white text-sm uppercase`}
                      >
                        {t(`orders.${lastStatus}`)}
                      </span>
                      <ViewStatusBtn order={order} />
                      {role === "admin" && <EditStatusBtn order={order} />}
                    </div>
                  </td>
                  <td className="text-center align-middle font-bold">
                    {isRTL === "ltr" && <span>$</span>}
                    {numberFormatter.format(order?.total.toFixed(2))}
                    {isRTL === "rtl" && <span>$</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 mt-4">
        {orders.map((order) => {
          const lastStatus = order.status?.[order.status.length - 1]?.status;
          return (
            <div
              key={order.id}
              className="bg-white shadow rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between text-sm">
                <span>{t("orders.items")}:</span>
                <span>{numberFormatter.format(order?.items?.length)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("orders.date")}:</span>
                <span>{formattedDate.format(new Date(order?.date))}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>{t("orders.status")}:</span>
                <span
                  className={`${statusColors[lastStatus]} px-3 py-1 rounded-xl text-white text-xs uppercase`}
                >
                  {t(`orders.${lastStatus}`)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("cart.total")}:</span>
                <span className="font-bold">
                  {isRTL === "ltr" && "$"}
                  {numberFormatter.format(order?.total.toFixed(2))}
                  {isRTL === "rtl" && "$"}
                </span>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <ViewStatusBtn order={order} />
                {role === "admin" && <EditStatusBtn order={order} />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
