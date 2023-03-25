import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  loginSlice,
  registerSlice,
  userDetailsSlice,
  usersSlice,
  userUpdateProfileSlice,
} from "./features/login/userSlice";
import productReducer, {
  productDetailsSlice,
} from "./features/product/productSlice";

const reducer = combineReducers({
  productList: productReducer,
  usersList: usersSlice.reducer,
  userSignIn: loginSlice.reducer,
  productDetails: productDetailsSlice.reducer,
  userRegister: registerSlice.reducer,
  userDetails: userDetailsSlice.reducer,
  userUpdateProfile: userUpdateProfileSlice.reducer,
});

// const middleware = [thunk];

const store = configureStore({
  reducer,
});

export default store;
