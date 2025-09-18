import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1. Extract token from cookies or headers
    const authHeader = req.header("Authorization");
    const tokenFromHeader = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = req.cookies?.accessToken || tokenFromHeader;

    // 2. If no token → unauthorized
    if (!token) {
      throw new ApiError(401, "Unauthorized request - No token provided");
    }

    console.log("🔑 Token from request:", token);


    // 3. Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 4. Find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token - User not found");
    }

    // 5. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
