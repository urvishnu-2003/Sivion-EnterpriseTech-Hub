import API from "../../../api/axios";

// Send OTP to admin email for password reset
export const sendForgotPasswordOTP = (email) => {
  return API.post("/auth/admin/forgot-password", { email });
};

// Verify OTP and reset password
export const resetPasswordWithOTP = (email, otp, newPassword) => {
  return API.post("/auth/admin/reset-password", {
    email,
    otp,
    newPassword,
  });
};
