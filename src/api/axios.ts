import axios, { type AxiosRequestHeaders } from "axios";
import { toast } from "sonner";

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (error.response.data.errorCode === "ERR_012") {
          toast.error("Token Expired. Please login again.")
        }
      }
      if (error.response.status === 403) {
        console.log("Forbidden");
      }
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Axios Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
