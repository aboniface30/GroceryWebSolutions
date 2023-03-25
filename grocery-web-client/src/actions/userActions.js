import {
  loginFail,
  loginRequest,
  loginSucces,
  registerFail,
  registerRequest,
  registerSuccess,
} from "../features/login/userSlice";
import axios from "axios";

const API_URL = "http://localhost:5000";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post("auth/jwt/create", {
      username,
      password,
    });

    if (response.status === 200) {
      // Store the JWT token in local storage.
      localStorage.setItem("tokens", response);
      dispatch(loginSucces(response));
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
    console.log("eerrrpr == ", error);
    dispatch(registerFail(error));
    console.error(error);
    throw error;
  }
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
