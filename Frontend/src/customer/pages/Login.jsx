import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import "./Login.css";
import banner from "../Assets/banner.png";
import { loginApi } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return "All fields are required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Enter a valid email address";
    }

    if (password.length < 4) {
      return "Password is too short";
    }

    return null;
  };

  const handleLogin = async () => {
    setError("");

    try {
      setLoading(true);
      const res = await loginApi({
        email: formData.email,
        password: formData.password,
      });

      const user = res.data.data.user;
      const token = res.data.data.accessToken;

      login(user, token);

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="banner">
          <img src={banner} alt="Online Shopping" />
        </div>

        <div className="login-content">
          <h2>Login</h2>

          <div className="email-input">
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="password-input"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button
            className="continue-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          <div className="help-text">
            Having trouble to get login ? <span>Get help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
