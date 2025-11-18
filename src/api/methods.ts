import axios from "./axios";

export const getData = async (url: string) => {
  const response = await axios.get(url);
  return response;
};

export const postData = async (url: string, data: any) => {
  const response = await axios.post(url, data);
  return response;
};
