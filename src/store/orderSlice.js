import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


const ordersSlice = createSlice({
  name: 'orders',
  initialState: JSON.parse(localStorage.getItem('orders')) || [
  {
    id: 1,
    userId: 2,
    items: [/* product items */],
    total: 1999.98,
    status: [{status:'pending',date:'2024-03-20'}],
    date: '2024-03-20'
  }
],
  reducers: {
    placeOrder(state, action) {
        
      state.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state));
      toast.success('Congrats Your Order Now In Pending Status')
    },
    updateOrderStatus(state, action) {
      const order = state.find(o => o.id === action.payload.id);
      if (order) {

        order.status.push({...action.payload.status})
        localStorage.setItem('orders', JSON.stringify(state));
              toast.success('Order Status Changed')
      }
    }
  }
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;