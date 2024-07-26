import axios from "axios";

axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_APP_API_COMMON_URL_PROD
    : import.meta.env.VITE_APP_API_COMMON_URL_LOCAL;

const service = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

// service.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem("user");
//     const userData = JSON.parse(user);

//     if (userData && userData.accessToken) {
//       config.headers["Authorization"] = `Bearer ${userData.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

export default service;
