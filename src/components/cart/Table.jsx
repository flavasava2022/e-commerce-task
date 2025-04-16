import React from "react";
import { addToCart, removeFromCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "lucide-react";

export default function Table({ cart }) {
  const dispatch = useDispatch();
  return (
    <table className="w-full ">
      <thead>
        <tr className=" bg-primary text-white  uppercase">
          <th style={{ width: "40%" }} className=" p-2 text-center">
            Product
          </th>
          <th className=" ">Quantity</th>
          <th className=" ">Price</th>
          <th className="">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id} className="">
            <td className="p-2">
              <div className="flex items-center gap-2">
                <div
                  className="me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                  }}
                >
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                    <i className="bi bi-image"></i>
                  </div>
                </div>
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-muted">SKU: {item.id}</small>
                </div>
              </div>
            </td>
            <td className="text-center align-middle ">
              <div className="flex items-center justify-center align-items-center">
                <button
                  className="cursor-pointer bg-primary rounded-l-2xl p-1 flex items-center justify-center  text-white"
                  onClick={() => {
                    dispatch(removeFromCart(item?.id));
                  }}
                >
                  <Minus size={18} />
                </button>
                <span className="text-primary  text-[18px] px-2">
                  {item.quantity}
                </span>
                <button
                  className="bg-primary rounded-r-2xl p-1 flex items-center justify-center  text-white cursor-pointer"
                  onClick={() => {
                    dispatch(addToCart(item));
                  }}
                >
                  <Plus size={18} />
                </button>
              </div>
            </td>
            <td className="text-center align-middle ">
              $ {item.price.toFixed(2)}
            </td>
            <td className="text-center align-middle fw-bold ">
              $ {(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
