import axios from "axios"
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess, productDetailsRequestFailed, productDetailsSuccess, requestProductDetails } from "../features/product/productSlice";

const API_URL = "http://localhost:5000"
export const fetchProducts = () => async (dispatch) => {
try {
  dispatch(fetchProductsStart());
  const response = await axios.get(`${API_URL}/api/products/`);

  if (response.status === 200) {
    dispatch(fetchProductsSuccess(response.data));
  }
  return response;
} catch (error) {
  dispatch(fetchProductsFailure(error));
  console.error(error);
  throw error;
}

}
export const fetchProduct = (id) => async (dispatch) => {
try {
  dispatch(requestProductDetails());
  const response = await axios.get(`${API_URL}/api/products/${id}/`);

  if (response.status === 200) {
    dispatch(productDetailsSuccess(response.data));
  }
  return response;
} catch (error) {
  dispatch(productDetailsRequestFailed(error));
  console.error(error);
  throw error;
}

}