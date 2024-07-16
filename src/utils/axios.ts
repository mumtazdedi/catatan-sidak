import axios from "axios";
// config

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_CATATAN_SIDAK_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
