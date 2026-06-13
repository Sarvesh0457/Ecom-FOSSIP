import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./customer/context/AuthContext";

import App from "./App.jsx";

// Customer Pages
import Home from "./customer/pages/Home.jsx";
import Explore from "./customer/pages/Explore.jsx";
import Login from "./customer/pages/Login.jsx";
import Signup from "./customer/pages/Signup.jsx";
import { ShopProvider } from "./customer/context/useShop";
import ProductDetail from "./customer/pages/ProductDetail.jsx";
import Wishlist from "./customer/pages/Wishlist.jsx";
import CustProfile from "./customer/pages/Profile.jsx";
import Cart from "./customer/pages/Cart.jsx";

// Seller Layout
import SellerLayout from "./seller/components/layout/Layout.jsx";

// Seller Pages
import { Dashboard } from "./seller/pages/Dashboard/Dashboard.jsx";
import { AllProducts } from "./seller/pages/Products/AllProducts.jsx";
import { Orders } from "./seller/pages/Orders/Orders.jsx";
import Customers from "./seller/pages/Customers/Customers.jsx";
import { Reviews } from "./seller/pages/Reviews/Reviews.jsx";
import Inventory from "./seller/pages/Inventory/Inventory.jsx";
import SellerProfile from "./seller/pages/Settings/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "explore/:gender",
        element: <Explore />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile",
        element: <CustProfile />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },

  // Seller Routes
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "profile",
        element: <SellerProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <RouterProvider router={router} />
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
);
