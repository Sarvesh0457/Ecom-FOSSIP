import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Send unauthorized users back to login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch the cart from MongoDB
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_URL}/v1/cart`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // CRITICAL FIX: Filter out any items where the product came back as 'null'
      const validItems = res.data.data.items.filter(item => item.product !== null);
      setCartItems(validItems);
      
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  // Update Quantity (+ or -)
  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        `${API_URL}/v1/cart/update`,
        { productId, action },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Backend returns the updated cart, so we instantly update the screen!
      setCartItems(res.data.data.items);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove Item Completely
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_URL}/v1/cart/remove/${productId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter it out of the UI instantly
      setCartItems(cartItems.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate the Total Price of everything in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // CRITICAL FIX: Safety check to ensure item.product exists before doing math
      if (!item.product) return total; 
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (!user) return null;
  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Cart...</div>;

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is totally empty.</p>
          <button onClick={() => navigate("/")} className="shop-btn">Go Shopping</button>
        </div>
      ) : (
        <div className="cart-container">
          {/* LEFT SIDE: The Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.product._id}>
                <img src={item.product.imageUrl} alt={item.product.name} />
                
                <div className="cart-details">
                  <h3>{item.product.brand}</h3>
                  <p>{item.product.name}</p>
                  <strong>₹{item.product.price}</strong>
                </div>

                <div className="cart-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.product._id, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, "increase")}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.product._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: The Math Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;