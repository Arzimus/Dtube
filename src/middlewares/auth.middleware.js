import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJwtToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    throw new ApiError(400, "Unauthorized request")
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid Access Token")
  }
  req.user = user;
  next();
})

export { verifyJwtToken }