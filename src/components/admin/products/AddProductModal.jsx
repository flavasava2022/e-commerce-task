import { useAnimate } from "motion/react";
import React, { useActionState, useState } from "react";

import { useFormStatus } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";

import { CircleX } from "lucide-react";
import { InputField } from "../../common/InputField";
import Modal from "../../common/Modal";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../store/productsSlice";
import { useTranslation } from "react-i18next";
import ImageUpload from "../../common/ImageUpload";

export default function AddProductModal({ onClose }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const [scope, animate] = useAnimate();
  const [errorMsg, setErrorMsg] = useState(null);
  const { t } = useTranslation();
  async function signupActions(pervData, formData) {
    const productData = Object.fromEntries(formData);
    let errors = {};
    setErrorMsg(null);
    console.log(productData);
    if (productData?.pic?.size === 0) {
      errors.pic = "This field is required.";
    }
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
        addProduct({
          category: productData?.category,
          description: productData?.description,
          name: productData?.productName,
          price: Number(productData?.price),
          stock: Number(productData?.inStock),
          image: previewUrl,
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
  });
  return (
    <Modal
      title={
        <p className="w-fit bg-primary p-2 text-white rounded-md">
          {t("admin.addNewProduct")}
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
          <div className="w-[50%] flex flex-col gap-2 h-full mb-[16px]">
            <label htmlFor="category" className="text-[14px]  font-bold">
              {t("products.category")}
            </label>
            <select
              id="category"
              name="category"
              value={formState?.defaultValues?.category}
              className="p-2 border-1 border-gray-300 rounded-lg outline-0"
            >
              <option value="" disabled={true}>
                {t("products.allCategories")}
              </option>
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
        <ImageUpload
          formState={formState}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
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
        {pending ? "Loading..." : t("admin.create")}
      </button>
    </div>
  );
};
