import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const noAuthApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_KHALTI_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `key ${import.meta.env.VITE_KHALTI_SECRET_KEY}`,
  },
});
