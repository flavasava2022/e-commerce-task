import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "../utils/mockData";
import toast from "react-hot-toast";

// Load initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {

      const { email, password } = action.payload;
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(`Welcome Back ${user?.name}`);
      } else {
        toast.error("Invalid Credentials");
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    register(state, action) {

      const newUser = {
        ...action.payload,
        id: Date.now(),
        role: "customer",
      };
      mockUsers.push(newUser);
      state.user = newUser;
      state.isAuthenticated = true;
        toast.success(`Welcome Back ${newUser?.name}`);
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
