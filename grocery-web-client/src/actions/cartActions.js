import axios from "axios";
import { useSelector } from "react-redux";
import { addItem, removeItem, updateItem } from "../features/cart/cartSlice";

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
    console.log("product =>", product);
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

    if (product.quantity === 0) {
      dispatch(removeFromCart(product.id, product.cart_item_id));
    }
    let quantity = 0;
    if (amount === -1) {
      quantity -= 1;
    } else {
      quantity += amount;
    }
    const response = await axios.patch(
      `${API_URL}/api/carts/${cart_id}/items/${product.cart_item_id}/`,
      { quantity: product.quantity + quantity }
    );
    console.log("patch res", response);
    if (response.status === 200) {
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
        dispatch(removeItem(product_id));
      }
    } catch (error) {}
  };

export const saveOrder = () => async (dispatch) => {
  const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;

  axios
    .post(
      "http://localhost:5000/api/orders/",
      {
        cart_id,
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
      if (response.status === 201) {
        const res = deleteCart(); //delete the cart after successfull submission
      }
    })

    .catch((error) => {
      console.log(error);
    });
};
export const fetchCartItems = () => async (dispatch) => {
  try {
    const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    const response = await axios.get(`${API_URL}/api/carts/${cart_id}`);
    if (response.status === 200) {
      console.log("cart items", response);

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
        console.log("items", items);
        dispatch(addItem(items));
      });
    }
    response.data;
  } catch (error) {}
};

const postEmptyCart = async () => {
  const response = await axios.post(`${API_URL}/api/carts/`, {});
  return response;
};

const deleteCart = async () => {
  try {
    const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
    const response = await axios.delete(`${API_URL}/api/carts/${cart_id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
