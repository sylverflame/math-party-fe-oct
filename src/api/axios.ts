import axios, { type AxiosRequestHeaders } from "axios";

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
