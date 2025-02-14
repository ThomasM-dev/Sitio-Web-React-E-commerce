import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct, setLoading, setError } = productSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;

export default productSlice.reducer;
