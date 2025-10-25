// *********** Imports *********** //
import axios from "axios";

// *********** Config Axios *********** //
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// *********** Interceptor to Add Auth Token *********** //
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// *********** Interceptor to Handle Errors *********** //
API.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// *********** Exports *********** //
export default API;
