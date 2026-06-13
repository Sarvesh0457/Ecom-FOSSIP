// import { User } from "../models/User.js";
// import { ApiError } from "../utils/api-error.js";
// import jwt from "jsonwebtoken";
// import { asyncHandler } from "../utils/async-handler.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   console.log("Cookies:", req.cookies);
//   console.log("Auth Header:", req.header("Authorization"));
//   const token =
//     req.cookies?.accessToken ||
//     req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     throw new ApiError(401, "Unauthorise request");
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
//     );

//     if (!user) {
//       throw new ApiError(401, "Token invalid");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("JWT ERROR:", error);
//     next(error);
//   }
// });

import { User } from "../models/User.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log("\n====== VERIFY JWT START ======");

  console.log("Cookies:", req.cookies);
  console.log("Auth Header:", req.header("Authorization"));

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("Extracted token:", token);

  if (!token) {
    console.log("❌ No token found");
    throw new ApiError(401, "Unauthorised request");
  }

  try {
    console.log(
      "ACCESS_TOKEN_SECRET exists:",
      !!process.env.ACCESS_TOKEN_SECRET,
    );

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("✅ Token decoded:");
    console.log(decodedToken);

    console.log("Looking for user:", decodedToken._id);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    console.log("User found:");
    console.log(user);

    if (!user) {
      console.log("❌ User not found");
      throw new ApiError(401, "Token invalid");
    }

    req.user = user;

    console.log("✅ verifyJWT passed");
    console.log("====== VERIFY JWT END ======\n");

    next();
  } catch (error) {
    console.log("❌ JWT ERROR");
    console.log(error);

    next(error);
  }
});
