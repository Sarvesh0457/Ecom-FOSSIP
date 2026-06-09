import axios from "axios";

// Your .env is set to "http://localhost:3000/api"
const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (gender) => {
  try {
    // 1. Added /v1/products/explore to match the new backend router
    // 2. Added withCredentials: true to pass the strict CORS bouncer
    const res = await axios.get(`${API_URL}/v1/products/explore`, {
      params: gender ? { gender } : {},
      withCredentials: true 
    });
    
    // Axios puts the JSON response inside the 'data' property automatically
    return res.data; 

  } catch (error) {
    // We added a console.error so if it fails again, you can press F12 and see exactly why!
    console.error("The exact Axios error is:", error);
    return { products: [], filters: {} }; 
  }
};