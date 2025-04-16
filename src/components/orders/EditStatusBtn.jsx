import React, { useState } from "react";
import EditOrderStatusModal from "./EditOrderStatusModal";
import { Pencil } from "lucide-react";

export default function EditStatusBtn({ order }) {
  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setEditOrderIsOpen(true)}
        className="cursor-pointer"
      >
        {" "}
        <Pencil className="text-primary" />
      </button>
      {editOrderIsOpen ? (
        <EditOrderStatusModal
          onClose={() => {
            setEditOrderIsOpen(false);
          }}
          order={order}
        />
      ) : null}
    </>
  );
}
