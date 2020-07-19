import Axios from "axios";

const token = window.localStorage.getItem("token");


const axios = Axios.create({
  baseURL: "http://www.steve911.fun/api/music/",
});

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  return response.data;
});

export default axios;
