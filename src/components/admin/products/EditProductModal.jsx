import { useAnimate } from "motion/react";
import React, { useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import { CircleX } from "lucide-react";
import { InputField } from "../../common/InputField";
import Modal from "../../common/Modal";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/productsSlice";
import { useTranslation } from "react-i18next";

export default function EditProductModal({ onClose, product }) {
  const dispatch = useDispatch();
  const [scope, animate] = useAnimate();
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation();
  async function signupActions(pervData, formData) {
    const productData = Object.fromEntries(formData);
    let errors = {};
    setErrorMsg(null);

    if (productData?.productName?.trim().length === 0) {
      errors.productName = "This field is required.";
    }
    if (productData?.description?.trim().length === 0) {
      errors.description = "This field is required.";
    }
    if (productData?.price?.trim().length === 0) {
      errors.price = "This field is required.";
    }
    if (productData?.inStock?.trim().length === 0) {
      errors.inStock = "This field is required.";
    }
    if (productData?.category?.trim().length === 0) {
      errors.category = "This field is required.";
    }
    animate(`input`, { borderColor: "#D0D5DD" });
    if (Object.keys(errors)?.length > 0) {
      Object.keys(errors).forEach((key) => {
        animate(
          `#${key}`,
          { x: [-10, 5], borderColor: "#c10007" },
          { type: "spring", duration: 0.7 }
        );
      });

      return { errors: errors, defaultValues: pervData };
    } else {
      dispatch(
        updateProduct({
          ...product,
          category: productData?.category,
          description: productData?.description,
          name: productData?.productName,
          price: Number(productData?.price),
          stock: Number(productData?.inStock),
          image: `/images/${productData?.category}.jpg`,
        })
      );
      onClose();
      return {
        errors: null,
        defaultValues: pervData,
      };
    }
  }

  const [formState, formActions] = useActionState(signupActions, {
    errors: null,
    defaultValues: {
      productName: product?.name,
      category: product?.category,
      price: product?.price,
      inStock: product?.stock,
      description: product?.description,
    },
  });
  return (
    <Modal
      key={product?.id}
      title={
        <p className="w-fit bg-primary p-2 text-white rounded-md">
          {t("admin.editProduct")}
        </p>
      }
      onClose={onClose}
    >
      <motion.form
        className="flex flex-col gap-2 p-4 w-full"
        action={formActions}
        ref={scope}
      >
        <div className="flex items-center gap-4">
          <InputField
            label={t("admin.productName")}
            name="productName"
            formState={formState}
            type="text"
            placeHolder={t("admin.productNamePlaceholder")}
          />
          <div className="w-[50%] flex flex-col gap-2 h-full">
            <label htmlFor="category" className="text-[14px]  font-bold">
              {t("products.category")}
            </label>
            <select
              id="category"
              defaultValue={formState?.defaultValues?.category}
              className="p-2 border-1 border-gray-300 rounded-lg outline-0"
            >
              <option value="">{t("products.allCategories")}</option>
              <option value="Electronics">{t("products.electronics")}</option>
              <option value="Clothes">{t("products.clothes")}</option>
              <option value="Shoes">{t("products.shoes")}</option>
              <option value="Furniture">{t("products.furniture")}</option>
              <option value="Jewelry">{t("products.jewelry")}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <InputField
            label={t("admin.price")}
            name="price"
            formState={formState}
            type="number"
            placeHolder={t("admin.pricePlaceholder")}
          />
          <InputField
            label={t("products.stock")}
            name="inStock"
            formState={formState}
            type="number"
            placeHolder={t("admin.inStock")}
          />
        </div>
        <InputField
          label={t("admin.description")}
          name="description"
          formState={formState}
          type="textarea"
          placeHolder={t("admin.descriptionPlaceholder")}
          width={"full"}
        />
        {errorMsg && (
          <div className="flex  items-center gap-2 p-2  bg-red-500 text-white rounded-lg">
            <CircleX className="w-[18px] text-danger" /> {errorMsg}
          </div>
        )}
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
