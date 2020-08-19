import axios from "axios";
import { getToken } from "./auth";

const API_URL = 'https://sp-opinions.pierreortega.dev';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;