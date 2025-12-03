import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckoutRoute = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items || []);

  if (!cartItems.length) {
    // Redirect if cart is empty
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CheckoutRoute;
