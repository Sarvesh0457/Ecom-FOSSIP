// import React, { useState } from "react";
// import "./Login.css";
// import banner from "../Assets/banner.png";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     mobile: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const { mobile, password } = formData;

//     if (!mobile || !password) {
//       return "All fields are required";
//     }

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       return "Enter a valid 10-digit mobile number";
//     }

//     if (password.length < 4) {
//       return "Password is too short";
//     }

//     return null;
//   };

//   const handleLogin = async () => {
//     setError("");
//     setSuccess("");

//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await loginApi({
//         mobile: formData.mobile,
//         password: formData.password,
//       });

//       // Example: token from backend
//       const token = res.data?.token;

//       if (token) {
//         localStorage.setItem("token", token);
//       }

//       setSuccess(res.data?.message || "Login successful!");

//       setFormData({
//         mobile: "",
//         password: "",
//       });
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Login failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="banner">
//           <img src={banner} alt="Online Shopping" />
//         </div>

//         <div className="login-content">
//           <h2>Login</h2>

//           <div className="mobile-input">
//             <span className="country-code">+91</span>

//             <input
//               type="text"
//               name="mobile"
//               placeholder="Mobile Number"
//               value={formData.mobile}
//               onChange={handleChange}
//             />
//           </div>

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="password-input"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           {error && <p className="error-text">{error}</p>}
//           {success && <p className="success-text">{success}</p>}

//           <button
//             className="continue-btn"
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Continue"}
//           </button>

//           <div className="help-text">
//             Having trouble to get login ? <span>Get help</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import banner from "../Assets/banner.png";
import { loginApi } from "../api/auth.js";

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
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
    const { mobile, password } = formData;

    if (!mobile || !password) {
      return "All fields are required";
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return "Enter a valid 10-digit mobile number";
    }

    if (password.length < 4) {
      return "Password is too short";
    }

    return null;
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // ⚠️ IMPORTANT FIX HERE
      // backend expects email OR username, NOT mobile

      const res = await loginApi({
        email: formData.mobile, // TEMP FIX (IMPORTANT)
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data?.data?.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      setSuccess(res.data?.message || "Login successful!");

      setFormData({
        mobile: "",
        password: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
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

          <div className="mobile-input">
            <span className="country-code">+91</span>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
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
