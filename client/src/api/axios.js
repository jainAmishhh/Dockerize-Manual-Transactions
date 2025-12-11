// src/api/axios.js

import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
});

// Request Interceptor: Attaches the token to the header before the request is sent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token saved during login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
