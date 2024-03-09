import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token; // Corrected accessing token from cookies
  console.log(token);
  if (!token) {
    console.log(token);
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User does not exist.", 401));
    }

    next();
  } catch (err) {
    // Catch any errors that occur during token verification
    return next(new ErrorHandler("Invalid token", 401));
  }
});
