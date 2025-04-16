import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      toast.success(`${action.payload?.name} Added To Cart`);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const existingItem = state.find((item) => item.id === action.payload);
      let newCartData;
      if (existingItem.quantity !== 1) {
        newCartData = state.map((cartItem) => {
          if (cartItem.id === action?.payload) {
            return { ...cartItem, quantity: existingItem.quantity - 1 };
          } else {
            return cartItem;
          }
        });
      } else {
        newCartData = state.filter(
          (cartItem) => cartItem.id !== action?.payload
        );
      }

      localStorage.setItem("cart", JSON.stringify(newCartData));
      toast.success(`${existingItem?.name} Removed from Cart`);
      return newCartData;
    },
    clearCart() {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
