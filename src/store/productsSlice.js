import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Initial products data
const initialProducts = [
  {
    id: 1,
    name: "Smartphone X1",
    price: 599.99,
    category: "Electronics",
    stock: 50,
    description: "Latest smartphone with great features",
    image: "/images/electronics1.jpg",
  },
  {
    id: 2,
    name: "Leather Jacket",
    price: 129.99,
    category: "Clothes",
    stock: 0,
    description: "Stylish leather jacket for all seasons",
    image: "/images/clothes1.jpg",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    category: "Shoes",
    stock: 45,
    description: "Comfortable and durable running shoes",
    image: "/images/shoes1.jpg",
  },
  {
    id: 4,
    name: "Wooden Desk",
    price: 299.99,
    category: "Furniture",
    stock: 20,
    description: "Spacious desk made from oak wood",
    image: "/images/furniture1.jpg",
  },
  {
    id: 5,
    name: "Diamond Necklace",
    price: 999.99,
    category: "Jewelry",
    stock: 10,
    description: "Elegant necklace with real diamonds",
    image: "/images/jewelry1.jpg",
  },
  {
    id: 6,
    name: "Bluetooth Headphones",
    price: 79.99,
    category: "Electronics",
    stock: 60,
    description: "Wireless headphones with noise cancellation",
    image: "/images/electronics2.jpg",
  },
  {
    id: 7,
    name: "Summer Dress",
    price: 49.99,
    category: "Clothes",
    stock: 0,
    description: "Lightweight and comfortable dress",
    image: "/images/clothes2.jpg",
  },
  {
    id: 8,
    name: "Formal Shoes",
    price: 109.99,
    category: "Shoes",
    stock: 25,
    description: "Perfect for business and formal events",
    image: "/images/shoes2.jpg",
  },
  {
    id: 9,
    name: "Modern Sofa",
    price: 699.99,
    category: "Furniture",
    stock: 15,
    description: "Comfortable 3-seater with sleek design",
    image: "/images/furniture2.jpg",
  },
  {
    id: 10,
    name: "Gold Bracelet",
    price: 449.99,
    category: "Jewelry",
    stock: 12,
    description: "Delicate bracelet made from pure gold",
    image: "/images/jewelry2.jpg",
  },
  {
    id: 11,
    name: "Smartwatch Pro",
    price: 199.99,
    category: "Electronics",
    stock: 40,
    description: "Tracks fitness, health, and notifications",
    image: "/images/electronics3.jpg",
  },
  {
    id: 12,
    name: "Winter Coat",
    price: 159.99,
    category: "Clothes",
    stock: 18,
    description: "Heavy-duty coat for cold weather",
    image: "/images/clothes3.jpg",
  },
  {
    id: 13,
    name: "Casual Sneakers",
    price: 64.99,
    category: "Shoes",
    stock: 50,
    description: "Everyday shoes with comfort and style",
    image: "/images/shoes3.jpg",
  },
  {
    id: 14,
    name: "Bookshelf",
    price: 149.99,
    category: "Furniture",
    stock: 22,
    description: "Tall and sturdy for all your books",
    image: "/images/furniture3.jpg",
  },
  {
    id: 15,
    name: "Pearl Earrings",
    price: 349.99,
    category: "Jewelry",
    stock: 8,
    description: "Elegant pearls with silver setting",
    image: "/images/jewelry3.jpg",
  },
  {
    id: 16,
    name: "Tablet Z",
    price: 329.99,
    category: "Electronics",
    stock: 33,
    description: "High-res screen and long battery life",
    image: "/images/electronics4.jpg",
  },
  {
    id: 17,
    name: "Denim Jeans",
    price: 59.99,
    category: "Clothes",
    stock: 42,
    description: "Classic fit and durable denim",
    image: "/images/clothes4.jpg",
  },
  {
    id: 18,
    name: "Hiking Boots",
    price: 139.99,
    category: "Shoes",
    stock: 20,
    description: "Waterproof and rugged for any trail",
    image: "/images/shoes4.jpg",
  },
  {
    id: 19,
    name: "Dining Table",
    price: 499.99,
    category: "Furniture",
    stock: 10,
    description: "Seats up to six, modern wood finish",
    image: "/images/furniture4.jpg",
  },
  {
    id: 20,
    name: "Ruby Ring",
    price: 899.99,
    category: "Jewelry",
    stock: 5,
    description: "Luxury ring with ruby centerpiece",
    image: "/images/jewelry4.jpg",
  },
  {
    id: 21,
    name: "Wireless Charger",
    price: 39.99,
    category: "Electronics",
    stock: 70,
    description: "Fast charging for compatible phones",
    image: "/images/electronics5.jpg",
  },
  {
    id: 22,
    name: "Hoodie",
    price: 44.99,
    category: "Clothes",
    stock: 55,
    description: "Soft cotton hoodie with pockets",
    image: "/images/clothes5.jpg",
  },
  {
    id: 23,
    name: "Slip-On Shoes",
    price: 49.99,
    category: "Shoes",
    stock: 60,
    description: "Easy to wear, perfect for everyday",
    image: "/images/shoes5.jpg",
  },
  {
    id: 24,
    name: "Office Chair",
    price: 189.99,
    category: "Furniture",
    stock: 17,
    description: "Ergonomic and adjustable",
    image: "/images/furniture5.jpg",
  },
];

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || initialProducts,
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
