import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("auth/jwt/create", {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        // Store the JWT token in local storage.
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const refreshAccesToken = async () => {
    try {
      const response = await axios.post("auth/jwt/refresh", {
        refresh: localStorage.getItem("refreshToken"),
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
      } else {
        logoutUser();
      }
      if (loading) {
        setLoading(false);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loading) {
      if (accessToken) {
        refreshAccesToken();
      } else {
        console.log("No token");
      }
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (accessToken && refreshToken) {
        refreshAccesToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [accessToken, refreshToken, refreshAccesToken, loading]);

  const logoutUser = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  });

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        accessToken,
        refreshToken,
        axiosInstance,
        refreshAccesToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
