import axios from "axios";
import { BASE_URL } from "./apiPath";
// create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 500) {
      console.error("Server error. Try again later.");
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
