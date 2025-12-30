import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import modalReducer from "./features/modalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
export default store;
