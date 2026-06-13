import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Add product
export const addToWishlistApi = (productId) => {
  return axios.post(
    `${API}/wishlist`,
    { productId },
    { withCredentials: true },
  );
};

// Get wishlist
export const getWishlistApi = () => {
  return axios.get(`${API}/wishlist`, {
    withCredentials: true,
  });
};

// Remove item
export const removeWishlistApi = (productId) => {
  return axios.delete(`${API}/wishlist/${productId}`, {
    withCredentials: true,
  });
};

// Clear wishlist
export const clearWishlistApi = () => {
  return axios.delete(`${API}/wishlist`, {
    withCredentials: true,
  });
};
