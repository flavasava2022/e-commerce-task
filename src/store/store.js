import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import ordersReducer from './ordersSlice';

export const store =  configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer
  }
});