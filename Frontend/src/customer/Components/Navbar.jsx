import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import profile from "../Assets/profile.png";
import heart from "../Assets/Heart.png";
import cart from "../Assets/Shopping cart.png";
import menu from "../Assets/menu.png";

import Searchbar from "./Searchbar";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "HOME", path: "/" },
  { name: "MEN", path: "/explore/men" },
  { name: "WOMEN", path: "/explore/women" },
  { name: "KIDS", path: "/explore/kids" },
  { name: "HOME DECOR", path: "/explore/home" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      {/* Top Bar */}
      <div className="top">
        <div className="top-content">
          <p>🚚 FREE SHIPPING ON ORDERS OVER ₹999</p>
          <span>|</span>
          <p>EASY 30-DAY RETURNS</p>
          <span>|</span>
          <p>NEW ARRIVALS EVERY WEEK</p>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navline">
        <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menu} alt="menu" />
        </div>

        <div className="logo">
          <Link to="/">Urban Fashion</Link>
        </div>

        <div className="nav-items">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="search">
          <Searchbar />
        </div>

        <div className="user-details">
          {/* Profile */}
          <Link
            to={user ? "/profile" : "/login"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="profile">
              <img src={profile} alt="profile" />
              <p>{user ? user.username : "Login"}</p>
            </div>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="profile">
              <img src={heart} alt="wishlist" />
              <p>Wishlist</p>
            </div>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="profile">
              <img src={cart} alt="cart" />
              <p>Cart</p>
            </div>
          </Link>

          {/* Logout */}
          {user && (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-nav">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
