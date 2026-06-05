import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/store/slices/product-slice";
import userReducer from "@/store/slices/user-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      products: productReducer
    }
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
