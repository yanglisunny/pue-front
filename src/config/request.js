import axios from "axios";
// import store from "@/store/index.js";

const request = axios.create({
  baseURL: "/api",
  timeout: "30000",
  method: "post",
});

request.interceptors.request.use((req) => {
  return req;
});

request.interceptors.response.use(
  (res) => {
    console.log(res, 'res')
    return res.data
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
