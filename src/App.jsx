/* eslint-disable no-unused-vars */
import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/imgs/download.png";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./componentes/Layout/Layout";
import Home from "./componentes/Home/Home";
import NotFound from "./componentes/NotFound/NotFound";
import Register from "./componentes/Register/Register";
import Login from "./componentes/Login/Login";
import Products from "./componentes/Products/Products";
import Cart from "./componentes/Cart/Cart";
import Categories from "./componentes/Categories/Categories";
import Brands from "./componentes/Brands/Brands";
import ContextProvider from "./Context/UserContext";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./componentes/ProductDetails/ProductDetails";
import WishList from "./componentes/WishList/WishList";
import CartContextProvider from "./componentes/CartContext/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import CheckOut from "./componentes/CheckOut/CheckOut";
import ForgetPassword from "./componentes/ForgetPassword/ForgetPassword";
import { WishListProvider } from "./componentes/CartContext/WishListContext";
import AllOrders from "./componentes/AllOrders/AllOrders";
import VerifyPassword from "./componentes/VerifyPssword/VerifyPassword";
import ResetPassword from "./componentes/ResetPassword/ResetPassword";
function App() {
  const queryClient = new QueryClient();
  // eslint-disable-next-line no-undef
  let router = createBrowserRouter([
    {
      // path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            // <ProtectedRoute>
            <Cart />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/wishList",
          element: (
            // <ProtectedRoute>
            <WishList />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            // <ProtectedRoute>
            <Categories />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            // <ProtectedRoute>
            <Brands />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/checkOut",
          element: (
            // <ProtectedRoute>
            <CheckOut />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/allOrders",
          element: (
            // <ProtectedRoute>
            <AllOrders />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            // <ProtectedRoute>
            <Products />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/productdetails/:id/:category",
          element: (
            // <ProtectedRoute>
            <ProductDetails />
            // </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/verifyPassword", element: <VerifyPassword /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ContextProvider>
          <CartContextProvider>
            <WishListProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster />
            </WishListProvider>
          </CartContextProvider>
        </ContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;