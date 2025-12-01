import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import contactReducer from "./slices/contactSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    users: userReducer,
    contacts: contactReducer,
    order: orderReducer,
  },
});
