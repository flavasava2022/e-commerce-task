import { AnimatePresence, motion } from "framer-motion";
import { CircleX } from "lucide-react";
import { useAnimate } from "motion/react";
import { useActionState, useEffect, useState } from "react";

import { useFormStatus } from "react-dom";

import toast from "react-hot-toast";
import { InputField } from "../../components/common/InputField";
import { useTranslation } from "react-i18next";
import { inputValidate } from "../../utils/forms";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const { t } = useTranslation();
  const [scope, animate] = useAnimate();
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  async function signupActions(pervData, formData) {
    const userData = Object.fromEntries(formData);

    let errors = {};

    setErrorMsg(null);
    inputValidate(userData, errors, t);
    animate(`input`, { borderColor: "#D0D5DD" });
    if (Object.keys(errors)?.length > 0) {
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
        login({
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
      className="flex flex-col gap-6"
      action={formActions}
      ref={scope}
    >
      <InputField
        label={t("auth.email")}
        name="email"
        formState={formState}
        type="text"
        placeHolder={t("auth.emailPlaceholder")}
        width="full"
      />
      <InputField
        label={t("auth.password")}
        name="password"
        formState={formState}
        type="password"
        placeHolder={t("auth.passwordPlaceholder")}
        width="full"
      />
      {errorMsg && (
        <div className="flex  items-center gap-2 p-2  bg-red-500 text-white rounded-lg">
          <CircleX className="w-[18px] text-danger" /> <div>{errorMsg}</div>
        </div>
      )}
      <SubmitButton />
    </motion.form>
  );
};

export default LoginForm;
const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <button
      disabled={pending}
      className="w-full bg-primary rounded-md p-2 text-white cursor-pointer font-[inter]"
    >
      {pending ? t("auth.loading") : t("auth.signIn")}
    </button>
  );
};
