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
        state.cartItems.push(item);
      }

      // state.cartItems.push(item);
    },
    updateItem: (state, action) => {
      const item = action.payload.product;

      const existingItem = state.cartItems.find((x) => x.id === item.id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existingItem.id
            ? {
                ...x,
                quantity: x.quantity + action.payload.amount,
              }
            : x
        );

        // state.cartItems.push(item);
        if (existingItem.quantity + action.payload.amount === 0) {
          state.cartItems = state.cartItems.filter(
            (x) => x.id !== existingItem.id
          );
        }
      }
    },
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload.product;
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
    clearCart: (state) => {
      state.cartItems.splice(0, state.cartItems.length);
    },

    // createOrderRecord: (state, actionn) => {

    // }
  },
});

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;
