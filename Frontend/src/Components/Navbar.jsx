import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Restored your AuthContext connection
import "./Navbar.css";

import loc from "../Assets/location_on.png";
import profile from "../Assets/profile.png";
import heart from "../Assets/Heart.png";
import cart from "../Assets/Shopping cart.png";
import menu from "../Assets/menu.png";

import Searchbar from "./Searchbar";

const menuItems = [
  { name: "HOME", path: "/" },
  { name: "MEN", path: "/explore/men" },
  { name: "WOMEN", path: "/explore/women" },
  { name: "KIDS", path: "/explore/kids" },
  { name: "HOME DECOR", path: "/explore/men" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Cleaned up their redundant local state + useEffect fetch loops 
  // and attached it directly to your real app authentication context.
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="top">
        <div className="top-content">
          <Link to="/">
            <img src={loc} alt="location" />
            Location not set
          </Link>
        </div>
      </div>

      <nav className="navline">
        <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menu} alt="menu" />
        </div>

        <div className="logo">
          <Link to="/">SITE NAME</Link>
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
          {/* Replaced user.username with your correct schema field user.name */}
          <Link
            to={user ? "/profile" : "/login"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="profile">
              <img src={profile} alt="profile" />
              <p>{user ? user.name : "Login / Signup"}</p>
            </div>
          </Link>

          {/* Conditional logout button using their exact layout block architecture */}
          {user && (
            <div 
              className="profile" 
              onClick={logout} 
              style={{ cursor: "pointer" }}
              title="Click to logout"
            >
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#ff4d4d" }}>
                LOGOUT
              </span>
            </div>
          )}

          <Link to="/wishlist">
            <div className="profile">
              <img src={heart} alt="wishlist" />
              <p>Wishlist</p>
            </div>
          </Link>

          <div className="profile">
            <img src={cart} alt="cart" />
            <p>Cart</p>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;