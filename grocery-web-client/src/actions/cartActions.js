import axios from "axios";
import { useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
  updateItem,
} from "../features/cart/cartSlice";
import { axiosInstance } from "./axiosInstance";

const API_URL = "http://localhost:5000";

export const addTocart = (product) => async (dispatch) => {
  let cart_id = "";
  try {
    if (localStorage.getItem("cart_id") === null) {
      const cart = await postEmptyCart();
      localStorage.setItem("cart_id", JSON.stringify(cart.data));
      cart_id = cart.data.id;
    }

    cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    const item = { product_id: product.id, quantity: 1 };
    console.log("product items =>", item);
    const response = await axios.post(
      `${API_URL}/api/carts/${cart_id}/items/`,
      item
    );

    if (response.status === 201) {
      dispatch(addItem(product));
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItem = (product, amount) => async (dispatch) => {
  try {
    const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    // const cartItem = cartItems.find(
    //   (item) => item.cart_item_id === cart_item_id
    // );
    console.log("quantity:", product.quantity);
    // if (product.quantity + amount === 0) {
    //   dispatch(removeFromCart(product.id, product.cart_item_id));
    //   dispatch(removeItem(product));
    // }
    // let quantity = 0;
    // if (amount === -1) {
    //   quantity -= 1;
    // } else {
    //   quantity += amount;
    // }
    const response = await axios.patch(
      `${API_URL}/api/carts/${cart_id}/items/${product.cart_item_id}/`,
      { quantity: product.quantity + amount }
    );
    console.log("patch res", response);
    if (response.status === 200) {
      if (response.data.quantity === 0) {
        dispatch(removeFromCart(product.id, product.cart_item_id));
        dispatch(removeItem(product));
      }
      dispatch(updateItem({ product, amount }));
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart =
  (product_id, cart_item_id) => async (dispatch) => {
    try {
      const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;

      const response = await axios.delete(
        `${API_URL}/api/carts/${cart_id}/items/${cart_item_id}/`
      );
      if (response.status === 204) {
        //204  deleted successfully
      }
    } catch (error) {}
  };

export const fetchCartItems = () => async (dispatch) => {
  dispatch(clearCart());

  try {
    const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    const response = await axios.get(`${API_URL}/api/carts/${cart_id}`);
    if (response.status === 200) {
      response.data.items.forEach((item, id) => {
        const items = {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          description: item.product.description,
          imageLink: item.product.imageLink,
          quantity: response.data.items[id].quantity,
          cart_item_id: response.data.items[id].id,
        };
        if (items.quantity > 0) {
          dispatch(addItem(items));
        }
      });
    }
    response.data;
  } catch (error) {}
};

const postEmptyCart = async () => {
  const response = await axios.post(`${API_URL}/api/carts/`, {});
  return response;
};

export const deleteCart = async () => {
  try {
    const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    const response = await axios.delete(`${API_URL}/api/carts/${cart_id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
