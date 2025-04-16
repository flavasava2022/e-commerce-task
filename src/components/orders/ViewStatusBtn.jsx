import React, { useState } from "react";

import { Eye } from "lucide-react";
import ViewOrderStatusModal from "./ViewOrderStatusModal";

export default function ViewStatusBtn({ order }) {
  const [editOrderIsOpen, setEditOrderIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setEditOrderIsOpen(true)}
        className="cursor-pointer"
      >
        {" "}
        <Eye className="text-primary" />
      </button>
      {editOrderIsOpen ? (
        <ViewOrderStatusModal
          onClose={() => {
            setEditOrderIsOpen(false);
          }}
          order={order}
        />
      ) : null}
    </>
  );
}
