import { useTranslation } from "react-i18next";
import Modal from "../common/Modal";

export default function ViewOrderStatusModal({ onClose, order }) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language === "ar" ? "ar-EG" : i18n.language;
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
    <Modal
      key={order?.id}
      title={
        <p className="w-fit bg-primary p-2 text-white rounded-md">
          {t("orders.OrderStatusHistory")}
        </p>
      }
      onClose={onClose}
    >
      <table className="w-full text-[12px] md:text-[16px] ">
        <thead>
          <tr className=" bg-primary text-white  uppercase">
            <th className="text-center ">{t("orders.date")}</th>
            <th className="text-center ">{t("orders.status")}</th>
          </tr>
        </thead>
        <tbody>
          {order?.status.map((order) => (
            <tr key={order.date} className="">
              <td className="text-center align-middle ">
                {formattedDate.format(new Date(order?.date))}
              </td>
              <td className="flex items-center justify-center p-2 gap-2">
                <p
                  className={`${
                    statusColors[order?.status]
                  } px-4 p-1 rounded-xl w-fit text-white uppercase`}
                >
                  {" "}
                  {t(`orders.${order?.status}`)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={onClose}
        className="w-fit bg-primary rounded-md p-2 px-4 text-white cursor-pointer font-[inter] ml-auto mr-0"
      >
        {t("admin.close")}
      </button>
    </Modal>
  );
}
