import { loginSucces, logOut } from "../features/login/userSlice";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const baseURL = "http://localhost:5000";
export const refreshToken = () => async (dispatch) => {
  const refresh = JSON.parse(localStorage.getItem("tokens")).refresh;

  try {
    const response = await axiosInstance.post(`${baseURL}/auth/jwt/refresh`, {
      refresh,
    });

    if (response.status === 200) {
      // Store the JWT token in local storage or cookies.
      const tokens = { access: response.data.access, refresh };
      localStorage.setItem("tokens", JSON.stringify(tokens));
      dispatch(loginSucces(JSON.stringify(response.data)));
    }
    if (response.status === 401) {
      dispatch(logOut());
    }

    return response;
  } catch (error) {
    console.error(error);
    dispatch(logOut());
  }
};
