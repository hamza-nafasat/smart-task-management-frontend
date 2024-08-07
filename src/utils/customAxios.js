import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const customAxios = axios.create({
  baseURL: `${serverUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const customFormAxios = axios.create({
  baseURL: `${serverUrl}/api/v1`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export { customAxios, customFormAxios };
