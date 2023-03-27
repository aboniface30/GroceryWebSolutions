import { createSlice } from "@reduxjs/toolkit";
export const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, error: "" },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },

    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducers for creating products
    createProductStart: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducers for updating products
    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducers for deleting products
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { product: {}, loading: false, error: "" },
  reducers: {
    requestProductDetails: (state, action) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsRequestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//exports
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = productsSlice.actions;

export const {
  requestProductDetails,
  productDetailsSuccess,
  productDetailsRequestFailed,
} = productDetailsSlice.actions;

export default productsSlice.reducer;
