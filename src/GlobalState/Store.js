import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from "./productsApi";
import productReducer from "./productSlice";
import authReducer from "../Authetications/authSlice";
import userApi from "./userApi";




const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      userApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
