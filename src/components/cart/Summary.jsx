import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";

export default function Summary({ cartTotal, cart }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const handleCheckout = () => {
    dispatch(
      placeOrder({
        id: Date.now(),
        userId: user?.id,
        items: cart,
        total: cartTotal,
        status: "pending",
        date: new Date().toISOString(),
      })
    );
    dispatch(clearCart());
  };
  return (
    <div className="md:w-[30%] md:min-w-[250px] w-full  p-4 flex flex-col gap-8 rounded-xl shadow">
      <p className=" text-xl font-semibold text-primary text-center">
        Cart Total
      </p>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">SubTotal:</p>
        <p className="text-secondary">$ {cartTotal?.toFixed(2)}</p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">Shipping:</p>
        <p className="text-secondary">Free</p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">Discount:</p>
        <p className="text-secondary">0%</p>
      </div>
      <div className="w-[90%] mx-auto border-b-2 text-primary flex items-center justify-between py-2">
        <p className="text-secondary">Total:</p>
        <p className="text-secondary">$ {cartTotal?.toFixed(2)}</p>
      </div>
      <Link className="w-[95%] mx-auto ">
        <button
          disabled={cartTotal === 0}
          onClick={handleCheckout}
          type="primary"
          className={`w-full bg-primary rounded-md p-2 text-white cursor-pointer font-[inter] ${
            cartTotal === 0 ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          Proceed to checkout
        </button>
      </Link>
    </div>
  );
}
