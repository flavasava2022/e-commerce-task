import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.productId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartItem(state, action) {
      const item = state.cart.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    placeOrder(state, action) {
      const newOrder = {
        id: Date.now(),
        userId: action.payload.userId,
        items: state.cart,
        total: state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'pending',
        date: new Date().toISOString()
      };
      state.orders.push(newOrder);
      state.cart = [];
      localStorage.setItem('orders', JSON.stringify(state.orders));
      localStorage.removeItem('cart');
    },
    updateOrderStatus(state, action) {
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCartItem,
  placeOrder, 
  updateOrderStatus 
} = ordersSlice.actions;

export default ordersSlice.reducer;