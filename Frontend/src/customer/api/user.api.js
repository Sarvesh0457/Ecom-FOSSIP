import axios from "axios";

const USER_API = "http://localhost:5000/api/v1/users";
const AUTH_API = "http://localhost:5000/api/v1/auth";

// 👤 Profile APIs
export const getProfileApi = () => {
  return axios.get(`${USER_API}/me`, {
    withCredentials: true,
  });
};

export const updateProfileApi = (data) => {
  return axios.patch(`${USER_API}/update-profile`, data, {
    withCredentials: true,
  });
};

export const deleteProfileApi = () => {
  return axios.delete(`${USER_API}/delete`, {
    withCredentials: true,
  });
};

// 📱 OTP APIs
export const sendPhoneOtpApi = (phone) => {
  return axios.post(
    `${AUTH_API}/send-phone-otp`,
    { phone },
    { withCredentials: true },
  );
};

export const verifyPhoneOtpApi = (phone, otp) => {
  return axios.post(
    `${AUTH_API}/verify-phone-otp`,
    { phone, otp },
    { withCredentials: true },
  );
};
