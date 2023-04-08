import axios from "axios";
import { addItem, removeItem } from "../features/cart/cartSlice";

export const addTocart = (product) => async (dispatch) => {
  try {
    const items = { product, quantity: 1, total_price: product.price };
    dispatch(addItem(product));
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch(removeItem(id));
  } catch (error) {}
};
