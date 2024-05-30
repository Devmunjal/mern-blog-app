import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: endpoint.baseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "",
  },
});

axiosInstance.interceptors.request.use(async function (config) {
  let jwtAccessToken = `Bearer ${localStorage.getItem("jwt")}`;
  config.headers.Authorization = jwtAccessToken ? jwtAccessToken : "";
  return config;
});

export default axiosInstance;
