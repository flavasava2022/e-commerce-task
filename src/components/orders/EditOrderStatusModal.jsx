import { useAnimate } from "motion/react";
import React, { useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { updateOrderStatus } from "../../store/orderSlice";
import Modal from "../common/Modal";

export default function EditOrderStatusModal({ onClose, order }) {
  const dispatch = useDispatch();
  const [scope, animate] = useAnimate();

  const { t } = useTranslation();
  async function signupActions(pervData, formData) {
    const statusData = Object.fromEntries(formData);
    dispatch(
      updateOrderStatus({
        id: order?.id,
        status: { status: statusData?.status, date: Date.now() },
      })
    );
    onClose();
  }

  const [formState, formActions] = useActionState(signupActions, {
    errors: null,
    defaultValues: {
      status: order?.status[order?.status?.length - 1]?.status,
    },
  });
  return (
    <Modal
      key={order?.id}
      title={
        <p className="w-fit bg-primary p-2 text-white rounded-md">
          {t("orders.editOrderStatus")}
        </p>
      }
      onClose={onClose}
    >
      <motion.form
        className="flex flex-col gap-2 p-4 w-full"
        action={formActions}
        ref={scope}
      >
        <label
          htmlFor="status"
          className="py-1 border-b-2 border-black text-xl font-semibold text-black w-fit"
        >
          {t("admin.orderStatus")}
        </label>
        <select
          name="status"
          defaultValue={formState?.defaultValues?.status}
          className="p-2 border-1 border-gray-300 rounded-lg outline-0"
        >
          <option value="" disabled={true}>
            {t("products.allStatus")}
          </option>
          <option value="pending">{t("orders.pending")}</option>
          <option value="processing">{t("orders.processing")}</option>
          <option value="shipped">{t("orders.shipped")}</option>
          <option value="delivered">{t("orders.delivered")}</option>
        </select>
        <SubmitButton onClose={onClose} />
      </motion.form>
    </Modal>
  );
}
const SubmitButton = ({ onClose }) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 ml-auto mr-0">
      <button
        type="button"
        disabled={pending}
        onClick={onClose}
        className="w-fit bg-primary rounded-md p-2 px-4 text-white cursor-pointer font-[inter] "
      >
        {t("admin.close")}
      </button>
      <button
        disabled={pending}
        className="w-fit bg-primary rounded-md p-2 px-4 text-white cursor-pointer font-[inter] "
      >
        {pending ? t("admin.loading") : t("admin.update")}
      </button>
    </div>
  );
};
