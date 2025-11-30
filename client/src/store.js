import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    users: userReducer,
    contacts: contactReducer,
  },
});
