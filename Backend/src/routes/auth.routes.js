import { Router } from "express";
import {
  registerUser,
  login,
  logoutUser,
  refreshAccessToken,
  verifyEmail,
  forgotPasswordRequest,
  resetForgotPassword,
  resendEmailVerification,
  changeCurrentPassword,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

import {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  useChangeCurrentPasswordValidator,
} from "../validators/index.js";

const router = Router();

// Public
router.post("/register", userRegisterValidator(), validate, registerUser);

router.post("/login", userLoginValidator(), validate, login);

router.get("/verify-email/:verificationToken", verifyEmail);

router.post("/refresh-token", refreshAccessToken);

router.post(
  "/forgot-password",
  userForgotPasswordValidator(),
  validate,
  forgotPasswordRequest,
);

router.post(
  "/reset-password/:resetToken",
  userResetForgotPasswordValidator(),
  validate,
  resetForgotPassword,
);

// Protected
router.post("/logout", verifyJWT, logoutUser);

router.post(
  "/change-password",
  verifyJWT,
  useChangeCurrentPasswordValidator(),
  validate,
  changeCurrentPassword,
);

router.post("/resend-email-verification", verifyJWT, resendEmailVerification);

export default router;
