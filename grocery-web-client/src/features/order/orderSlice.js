import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    success: false,
    saveSuccess: false , error: null,
  },
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
    },
    fetchOrderSuccess: (state, action) => {
      state.success = true;
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrderFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveOrdersSuccess: (state) => {
      state.loading = false;
      state.saveSuccess = true;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrderSuccess,
  saveOrdersSuccess,
  fetchOrderFailed,
} = orderSlice.actions;
