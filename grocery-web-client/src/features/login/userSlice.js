import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("api/users/login", { email, password });
      localStorage.setItem("tokens", JSON.stringify(response.data));

      return JSON.stringify(response.data);
    } catch (error) {
      console.log("error = ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userInfoFromStorage = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : { access: "", refresh: "" };

const loginSlice = createSlice({
  name: "login",
  initialState: {
    tokens: userInfoFromStorage,
    name: "",
    cart: {},
    error: "",
    loading: false,
    success: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      
    },

    loginSucces: (state, action) => {
      state.loading = false;
      state.success = true;
      state.tokens = action.payload;
      // {state.loading: false, userInfo: action.payload}
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getName: (state, action) => {
      state.name = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("tokens");
      state.tokens = {};
    },
  },

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.tokens = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const registerSlice = createSlice({
  name: "register",
  initialState: { user: {}, loading: false, error: "" },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { user: {}, loading: false, error: null },
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: { userInfo: {}, loading: false, error: null, success: false },
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userUpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// exports

export const { loginRequest, loginSucces, loginFail, logOut, getName } =
  loginSlice.actions;
export const { registerRequest, registerSuccess, registerFail } =
  registerSlice.actions;
export const { userDetailsRequest, userDetailsSuccess, userDetailsFail } =
  userDetailsSlice.actions;

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFail } =
  usersSlice.actions;
export const {
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
} = userUpdateProfileSlice.actions;

export {
  loginSlice,
  userDetailsSlice,
  registerSlice,
  userUpdateProfileSlice,
  usersSlice,
};
