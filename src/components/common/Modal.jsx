import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop"
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={onClose}
      />
      <motion.dialog
        open
        className="modal rtl:translate-x-[50%]  translate-x-[-50%] translate-y-[-50%] shadow p-4 rounded-2xl flex flex-col gap-4 items-center"
        key="modal"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <h2 className="font-bold">{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
