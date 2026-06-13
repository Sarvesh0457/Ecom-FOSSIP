import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// ➕ Add to cart
export const addToCartApi = async (data) => {
  return await axios.post(`${API}/cart`, data, {
    withCredentials: true, // IMPORTANT for cookies
  });
};

// 📦 Get cart
export const getCartApi = () => {
  return axios.get(`${API}/cart`, {
    withCredentials: true,
  });
};

// ❌ Remove item
export const removeFromCartApi = (id) => {
  return axios.delete(`${API}/cart/${id}`, {
    withCredentials: true,
  });
};

// 🧹 Clear cart
export const clearCartApi = () => {
  return axios.delete(`${API}/cart`, {
    withCredentials: true,
  });
};

// 🔁 Update quantity
export const updateCartApi = (id, data) => {
  return axios.patch(`${API}/cart/${id}`, data, {
    withCredentials: true,
  });
};
