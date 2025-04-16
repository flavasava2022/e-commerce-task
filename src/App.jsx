import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import AuthPage from "./pages/Auth/AuthPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Products from "./pages/Dashboard/Products";
import Cart from "./pages/Dashboard/Cart";
import Orders from "./pages/Dashboard/Orders";
import AdminPage from "./pages/Dashboard/AdminPage";
import ErrorPage from "./pages/Dashboard/ErrorPage";
import ProductPage from "./pages/Dashboard/ProductPage";

function App() {
  const route = createBrowserRouter([
    { path: "/", element: <AuthPage /> },
    {
      path: "/dashboard",
      errorElement: <ErrorPage />,
      element: <DashboardLayout />,

      children: [
        { path: "/dashboard", element: <Products /> },
        { path: "/dashboard/cart", element: <Cart /> },
        { path: "/dashboard/orders", element: <Orders /> },
        { path: "/dashboard/admin", element: <AdminPage /> },
        { path: "/dashboard/product/:id", element: <ProductPage /> },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
