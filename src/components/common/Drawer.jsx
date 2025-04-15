import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleX } from "lucide-react";
export default function Drawer({ children, title, setIsOpen }) {
  return (
    <>
      <motion.div
        onClick={() => setIsOpen(false)}
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 `}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "320px", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">{title}</h2>
          <button onClick={() => setIsOpen(false)}>
            <CircleX className="cursor-pointer" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </motion.div>
    </>
  );
}
