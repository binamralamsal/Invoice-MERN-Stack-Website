import { showNotification } from "@mantine/notifications";
import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import storage from "@/utils/storage";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = storage.getToken();

  if (!config.headers) config.headers = {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const responseData = error.response?.data;
    const message = responseData?.message || error.message;

    if (responseData?.message === "Validation error") {
      responseData?.issues.forEach((issue: { message: string }, index: number) => {
        setTimeout(() => {
          showNotification({
            title: "Validation error",
            message: issue.message,
            color: "red",
          });
        }, 200 * index);
      });
    } else showNotification({ message, color: "red" });

    return Promise.reject(error);
  }
);
