import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { MockProducts } from "../utils/mockData";




const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || MockProducts,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };
      toast.success(`${newProduct?.name} Added Successfully`)
      state.products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.products));
              toast.success(`${action?.payload?.name} Updated Successfully`)
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (p) => p.id !== action?.payload?.id
      );
      toast.success(`${action?.payload?.name} Deleted`);
      localStorage.setItem("products", JSON.stringify(state.products));
    },


  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,


} = productsSlice.actions;

export default productsSlice.reducer;
