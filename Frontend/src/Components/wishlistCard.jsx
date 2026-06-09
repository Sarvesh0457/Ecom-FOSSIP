import React from "react";
import axios from "axios"; // Make sure to import axios!
import "./WishlistCard.css";
import trash from "../Assets/trash.png";
import cart from "../Assets/Shopping cart.png";
import star from "../Assets/star.png";

const ProductCard = ({ product, onDelete }) => {
  
  // ADD THIS FUNCTION: Send the item to the cart database
  const handleAddToCart = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("accessToken");
      
      await axios.post(
        `${API_URL}/v1/cart/add`,
        { productId: product._id, quantity: 1 }, // Send MongoDB ID
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert("Added to Cart! 🛒");
    } catch (error) {
      console.error("Cart error:", error);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <button className="delete-btn" onClick={() => onDelete(product._id)}>
          <img src={trash} alt="delete" />
        </button>
      </div>

      {/* FIXED: Attached the onClick event to the button! */}
      <button className="add-cart-btn" onClick={handleAddToCart}>
        <img src={cart} alt="Cart" />
        Add to Cart
      </button>

      <div className="product-details">
        <h4>{product.name}</h4>
        <h3>₹{product.price}</h3>
        <div className="rating">
          {product.rating}
          <img src={star} alt="star" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;