import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginApi = (data) => {
  return API.post("/auth/login", data);
};

export const logoutApi = () => {
  return API.post("/auth/logout");
};
