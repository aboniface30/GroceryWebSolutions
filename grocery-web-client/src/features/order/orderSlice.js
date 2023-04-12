import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], loading: false, success: false, error: null },
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
  },
});

export const { fetchOrdersStart, fetchOrderSuccess, fetchOrderFailed } =
  orderSlice.actions;
