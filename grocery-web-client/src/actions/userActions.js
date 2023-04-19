import {
  loginFail,
  loginRequest,
  loginSucces,
  registerFail,
  registerRequest,
  registerSuccess,
} from "../features/login/userSlice";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const API_URL = "http://localhost:5000";

// let accessToken = localStorage.getItem("tokens")
//   ? localStorage.getItem("tokens").data.access
//   : "";
export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(`${API_URL}/auth/jwt/create/`, {
      username,
      password,
    });

    if (response.status === 200) {
      // Store the JWT token in local storage.
      localStorage.setItem("tokens", JSON.stringify(response.data));
      dispatch(loginSucces(JSON.stringify(response.data)));
    }

    return response;
  } catch (error) {
    dispatch(loginFail(error));
    console.error(error);
  }
};

export const SignUpUser = (username, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(`${API_URL}/auth/users/`, {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      dispatch(registerSuccess(response.data));
    }
    return response;
  } catch (error) {
    dispatch(registerFail(error));
    console.error(error);
    throw error;
  }
};



 const getUser = async () => {
    try {
      const response = await axiosInstance.get("auth/users/me");

      if (response.status === 200) {
        // navigate("/");
        setUserName(response.data.username);
      }

      return response;
    } catch (error) {
      logoutUser();
      console.error(error);
    }
  };

// Function to fetch user data from Django endpoint
export const fetchUserData = (accessToken) => async (dispatch) => {
  axios
    .post(
      "api/customers/",

      {
        headers: {
          Authorization: `JWT ${accessToken}`,
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
//   const SignUpCustomer = async (access) => {
//     //get the user via the access token
//     const axiosInstance = axios.create({
//       // baseURL: "https://rashel-production.up.railway.app",
//       baseURL: "http://localhost:5000",
//       headers: {
//         Authorization: `JWT ${access.data.access}`,
//       },
//     });
//     const user_data = await axiosInstance
//       .get("/auth/users/")
//       .then((response) => {
//         console.log("User ===> ", response);
//         // SignUp user as a customer on successful response
//         const customerResponse = axiosInstance
//           .put(`${API_URL}/api/customers/me/`, {
//             id: response.data.id,
//             phone,
//             email,
//           })
//           .then((res) => {
//             if (res.status === 200) {
//               navigate("/login");
//             }
//           });

//         console.log("customerResponse", customerResponse);
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.log(error);
//       });
//     console.log("user data", user_data);
//   };
