import Axios from "axios";


const token = window.localStorage.getItem("token");


const axios = Axios.create()
axios.interceptors.request.use(config => {
  config.headers["Authorization"] = token
  return config
},
  error => Promise.reject(error)
)

export default axios