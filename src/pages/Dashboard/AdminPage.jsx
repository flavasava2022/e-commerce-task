import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useSelector } from "react-redux";
import ProductsAdmin from "../../components/admin/products/ProductsAdmin";
import OrdersAdmin from "../../components/admin/orders/OrdersAdmin";
import { useTranslation } from "react-i18next";

export default function AdminPage() {
  const user = useSelector((state) => state?.auth?.user);

  const { t } = useTranslation();
  if (user?.role !== "admin") {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }
  const tabs = [
    { name: "products", render: <ProductsAdmin /> },
    { name: "orders", render: <OrdersAdmin /> },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className=" p-2 shadow md:w-[90%] mx-auto mt-4 rounded-xl">
      <nav>
        <ul className="flex border-b-2 border-b-[#EAECF0] gap-4">
          {tabs.map((item) => (
            <motion.li
              key={item.name}
              initial={false}
              animate={{
                color:
                  item.name === selectedTab.name
                    ? "var(--color-primary)"
                    : "var(--color-black)",
              }}
              className="relative cursor-pointer  py-4 flex items-center justify-center gap-4 text-[#667085] text-[16px] font-[inter]"
              onClick={() => setSelectedTab(item)}
            >
              {t(`admin.${item.name}`)}
              {item.name === selectedTab.name ? (
                <motion.div
                  className=" absolute bottom-[-2px] h-[2px] bg-primary w-full"
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab : "empty"}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-4"
          >
            {selectedTab.render}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
