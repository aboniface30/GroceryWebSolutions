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

export const saveOrder = (items) => async (dispatch) => {
  axios
    .post(
      "http://localhost:5000/api/orders/",
      {
        products: items,
      },

      {
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("tokens")).access
          }`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
