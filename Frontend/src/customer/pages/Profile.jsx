import React, { useEffect, useState } from "react";
import {
  getProfileApi,
  updateProfileApi,
  deleteProfileApi,
  sendPhoneOtpApi,
  verifyPhoneOtpApi,
} from "../api/user.api";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfileApi();
      const data = res.data.data;

      setUser(data);

      setForm({
        fullName: data.fullName || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
      });

      // if phone already exists → allow OTP
      if (data.phoneNumber) {
        setProfileUpdated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👤 STEP 1: UPDATE PROFILE FIRST
  const updateProfile = async () => {
    try {
      setLoading(true);

      await updateProfileApi(form);

      alert("Profile updated successfully");

      setProfileUpdated(true); // 🔥 unlock OTP section

      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 📱 STEP 2: SEND OTP ONLY AFTER PROFILE UPDATE
  const sendOtp = async () => {
    try {
      if (!profileUpdated) {
        alert("Please update profile first");
        return;
      }

      await sendPhoneOtpApi(form.phoneNumber);

      setOtpSent(true);

      alert("OTP sent to phone");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // 🔐 VERIFY OTP
  const verifyOtp = async () => {
    try {
      await verifyPhoneOtpApi(form.phoneNumber, otp);

      alert("Phone verified successfully");

      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete account?")) return;

    try {
      await deleteProfileApi();
      alert("Account deleted");
      window.location.href = "/login";
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {/* EMAIL STATUS */}
        <div className="email-status">
          <span>{user.email}</span>

          {!user.isEmailVerified ? (
            <span className="warn">❗ Not Verified</span>
          ) : (
            <span className="ok">Verified</span>
          )}
        </div>

        {/* NAME */}
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        {/* PHONE */}
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        {/* UPDATE FIRST */}
        <button className="update-btn" onClick={updateProfile}>
          {loading ? "Updating..." : "Save Profile"}
        </button>

        {/* OTP ONLY AFTER UPDATE */}
        {profileUpdated && (
          <>
            <button className="verify-btn" onClick={sendOtp}>
              Send OTP
            </button>

            {otpSent && (
              <>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />

                <button className="verify-btn" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </>
            )}
          </>
        )}

        {/* ADDRESS */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        {/* DELETE */}
        <button className="delete-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
