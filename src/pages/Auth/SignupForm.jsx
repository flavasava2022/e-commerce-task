import { useActionState, useState } from "react";

import { useAnimate } from "motion/react";

import { useFormStatus } from "react-dom";

import { AnimatePresence, motion } from "framer-motion";
import { CircleX } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/common/InputField";
import { useTranslation } from "react-i18next";
import { inputValidate } from "../../utils/forms";
import { useDispatch } from "react-redux";
import { register } from "../../store/authSlice";
const SignupForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [errorMsg, setErrorMsg] = useState(null);
  async function signupActions(pervData, formData) {
    const userData = Object.fromEntries(formData);
    let errors = {};
    setErrorMsg(null);
    inputValidate(userData, errors);
    console.log(errors);
    animate(`input`, { borderColor: "#D0D5DD" });
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        animate(
          `#${key}`,
          { x: [-10, 5], borderColor: "#c10007" },
          { type: "spring", duration: 0.7 }
        );
      });

      return { errors: errors, defaultValues: userData };
    } else {
      dispatch(
        register({
          name: userData?.fullName,
          password: userData?.password,
          email: userData?.email,
        })
      );
      return {
        errors: null,
      };
    }
  }

  const [formState, formActions] = useActionState(signupActions, {
    errors: null,
  });

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
      className="flex flex-col gap-2"
      action={formActions}
      ref={scope}
    >
      <InputField
        label={t("auth.name")}
        name="fullName"
        formState={formState}
        type="text"
        placeHolder={t("auth.namePlaceholder")}
        width="full"
      />

      <InputField
        label={t("auth.email")}
        name="email"
        formState={formState}
        type="text"
        placeHolder={t("auth.emailPlaceholder")}
        width="full"
      />
      <div className="flex items-center justify-between gap-4">
        <InputField
          label={t("auth.password")}
          name="password"
          formState={formState}
          type="password"
          placeHolder={t("auth.passwordPlaceholder")}
        />
        <InputField
          label={t("auth.confirmPassword")}
          name="confPassword"
          formState={formState}
          type="password"
          placeHolder={t("auth.confirmPasswordPlaceholder")}
        />
      </div>
      {errorMsg && (
        <div className="flex  items-center gap-2 p-2  bg-red-500 text-white rounded-lg">
          <CircleX className="w-[18px] text-danger" /> {errorMsg}
        </div>
      )}
      <SubmitButton />
    </motion.form>
  );
};

export default SignupForm;
const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <button
      disabled={pending}
      className="w-full bg-primary rounded-md p-2 text-white cursor-pointer font-[inter]"
    >
      {pending ? t("auth.loading") : t("auth.signUp")}
    </button>
  );
};
