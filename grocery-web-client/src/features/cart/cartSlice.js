import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existingItem.id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      // state.cartItems.push(item);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.id !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
