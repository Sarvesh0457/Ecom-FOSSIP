import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/auth";
import "./Signup.css";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (!agree) {
      setError("Please accept terms and conditions");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser(formData);

      console.log(res.data);

      // If your backend returns token and user
      const user = res.data?.data?.user;
      const token = res.data?.data?.accessToken;

      if (user && token) {
        login(user, token);
      }

      navigate("/");
    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Signup</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="input-field"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">Customer</option>
          <option value="seller">Seller</option>
        </select>

        <div className="terms-section">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <p>I agree to the terms and conditions.</p>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          className="continue-btn"
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Please Wait..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
