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
          x.id === existingItem.id
            ? {
                ...x,
                quantity: x.quantity + 1,
              }
            : x
        );
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.cartItems.find((x) => x.id === itemIdToRemove);
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          state.cartItems = state.cartItems.map((x) =>
            x.id === itemIdToRemove ? { ...x, quantity: x.quantity - 1 } : x
          );
        } else {
          state.cartItems = state.cartItems.filter(
            (x) => x.id !== itemIdToRemove
          );
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
