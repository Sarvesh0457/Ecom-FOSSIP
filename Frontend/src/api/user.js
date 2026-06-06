import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Get logged-in user----------
export const getCurrentUser = () => {
  return API.post("/auth/current-user");
};

// LOGOUT (optional but useful later)=---
export const logoutUser = () => {
  return API.post("/auth/logout");
};
