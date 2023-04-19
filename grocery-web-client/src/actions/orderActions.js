import { saveOrdersSuccess } from "../features/order/orderSlice";
import { axiosInstance } from "./axiosInstance";
import { deleteCart } from "./cartActions";

export const saveOrder = () => async (dispatch) => {
  console.log("save order called");
  const cart_id = JSON.parse(localStorage.getItem("cart_id")).id;
  let success = false;
  const res = axiosInstance
    .post("/api/orders/", {
      cart_id,
    })
    .then((response) => {
      if (response.status === 200) {
        dispatch(saveOrdersSuccess());
        //the server will take care of deleting the cart after successfull order submission
        // but the client should delete the cart id
        localStorage.removeItem("cart_id");
      }
    })

    .catch((error) => {
      console.log(error);
    });
  return success;
};
