import { Pencil } from "lucide-react";
import React, { useState } from "react";
import EditProductModal from "./EditProductModal";

export default function EditProductBtn({ product }) {
  const [editProductIsOpen, setEditProductIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setEditProductIsOpen(true)}
        className="cursor-pointer"
      >
        {" "}
        <Pencil className="text-primary" />
      </button>
      {editProductIsOpen ? (
        <EditProductModal
          onClose={() => {
            setEditProductIsOpen(false);
          }}
          product={product}
        />
      ) : null}
    </>
  );
}
