// import React, { useState } from "react";
// import "./Signup.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     address: "",
//   });

//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const validateInitialForm = () => {
//     const { name, username, email, address } = formData;

//     if (!name || !username || !email || !address) {
//       return "All fields are required";
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return "Enter a valid email address";
//     }

//     if (!agree) {
//       return "Please accept terms and conditions";
//     }

//     return null;
//   };

//   const handleSendOtp = async () => {
//     setError("");
//     setSuccess("");

//     const validationError = validateInitialForm();

//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await sendSignupOtpApi({
//         email: formData.email,
//       });

//       setOtpSent(true);

//       setSuccess(res.data?.message || "OTP sent successfully to your email.");
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Failed to send OTP. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setError("");
//     setSuccess("");

//     if (!otp) {
//       setError("Please enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await verifySignupOtpApi({
//         ...formData,
//         otp,
//       });

//       setSuccess(res.data?.message || "Account created successfully!");

//       setFormData({
//         name: "",
//         username: "",
//         email: "",
//         address: "",
//       });

//       setOtp("");
//       setAgree(false);
//       setOtpSent(false);
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Invalid OTP. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-card">
//         <h1>Signup</h1>

//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="input-field"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           name="username"
//           type="text"
//           placeholder="Username"
//           className="input-field"
//           value={formData.username}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="input-field"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         {otpSent && (
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             className="input-field"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//         )}

//         {!otpSent && (
//           <input
//             name="address"
//             type="text"
//             placeholder="Address"
//             className="input-field"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         )}

//         {!otpSent && (
//           <div className="terms-section">
//             <input
//               type="checkbox"
//               checked={agree}
//               onChange={() => setAgree((prev) => !prev)}
//             />

//             <p>
//               By continuing, I agree to the terms and conditions. Age should be
//               above 18.
//             </p>
//           </div>
//         )}

//         {error && <p className="error-text">{error}</p>}
//         {success && <p className="success-text">{success}</p>}

//         <button
//           className="continue-btn"
//           disabled={loading}
//           onClick={otpSent ? handleVerifyOtp : handleSendOtp}
//         >
//           {loading ? "Please Wait..." : otpSent ? "Verify OTP" : "Continue"}
//         </button>

//         <div className="help-text">
//           Having trouble getting login?
//           <span> Get help</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import "./Signup.css";
import { registerUser } from "../api/auth.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInitialForm = () => {
    const { name, username, email, address } = formData;

    if (!name || !username || !email || !address) {
      return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Enter a valid email address";
    }

    if (!agree) {
      return "Please accept terms and conditions";
    }

    return null;
  };

  // ❌ OLD OTP FLOW REMOVED
  // ✅ NOW: direct backend registration

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    const validationError = validateInitialForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        username: formData.username,
        email: formData.email,
        password: "123456", // ⚠️ TEMP (you can add password field later)
      });

      setSuccess(res.data?.message || "User registered successfully!");

      setFormData({
        name: "",
        username: "",
        email: "",
        address: "",
      });

      setAgree(false);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again.",
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
          name="name"
          type="text"
          placeholder="Name"
          className="input-field"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="username"
          type="text"
          placeholder="Username"
          className="input-field"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />

        {!otpSent && (
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input-field"
            value={formData.address}
            onChange={handleChange}
          />
        )}

        {!otpSent && (
          <div className="terms-section">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree((prev) => !prev)}
            />

            <p>
              By continuing, I agree to the terms and conditions. Age should be
              above 18.
            </p>
          </div>
        )}

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button
          className="continue-btn"
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Please Wait..." : "Continue"}
        </button>

        <div className="help-text">
          Having trouble getting login?
          <span> Get help</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
