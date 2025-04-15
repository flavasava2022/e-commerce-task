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

function App() {
  const route = createBrowserRouter([
    { path: "/", element: <AuthPage /> },
    {
      path: "/dashboard",
      element: <DashboardLayout />,

      children: [{ path: "/dashboard", element: <Products /> }],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
