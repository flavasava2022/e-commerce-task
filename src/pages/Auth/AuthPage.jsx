import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
const AuthPage = () => {
  const [login, setLogin] = useState(true);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      <motion.main
        className={` flex items-center w-screen   bg-white h-screen relative overflow-hidden`}
      >
        <div className="w-full absolute p-2 bottom-0 right-0 flex items-center justify-between gap-2 shadow bg-white">
          <LanguageSwitcher />
        </div>
        <motion.div
          initial={{ width: isDesktop ? "0%" : "100%" }}
          animate={{ width: isDesktop ? "50%" : "100%" }}
          transition={{
            duration: 0.5,
          }}
          className="md:w-[50%] w-full flex items-center justify-center "
        >
          <AnimatePresence>
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <p className="text-primary text-[32px] font-bold md:hidden">
                {login ? t("auth.welcomeBack") : t("auth.hello")}
              </p>
              <div className="p-4">
                {login ? <LoginForm /> : <SignupForm />}
              </div>

              {login ? (
                <p className="text-[16px] text-primary text-center md:hidden">
                  {t("auth.noAccount")}
                  <span
                    className=" underline text-secondary"
                    onClick={() => setLogin(!login)}
                  >
                    {t("auth.signUp")}
                  </span>
                </p>
              ) : (
                <p className="text-[16px] text-primary text-center md:hidden">
                  {t("auth.haveAccount")}
                  <span
                    className=" underline text-secondary"
                    onClick={() => setLogin(!login)}
                  >
                    {t("auth.signIn")}
                  </span>
                </p>
              )}
            </div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "50%" }}
          transition={{
            duration: 0.5,
          }}
          className="h-full  bg-primary md:flex items-center justify-center hidden"
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-white text-[32px] font-bold">
              {login ? t("auth.welcomeBack") : t("auth.hello")}
            </p>
            <p className="text-[26px] text-white text-center">
              {login ? t("auth.noAccount") : t("auth.haveAccount")}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-primary cursor-pointer border-2 flex items-center justify-center py-2 border-white rounded-md px-4 w-full bg-white  font-semibold"
              onClick={() => setLogin(!login)}
            >
              {login ? t("auth.signUp") : t("auth.signIn")}
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
};
export default AuthPage;
