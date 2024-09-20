const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
    console.log("Authorization header:", req.headers.authorization);
console.log("Token extracted:", token);

    try {
      if (token) {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user based on decoded token id
        const user = await User.findById(decoded?.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        // Attach the user object to the request
        req.user = user;
        next();
      }
    } catch (error) {
      // If the token is invalid or expired
      return res.status(401).json({ message: "Not Authorized, token expired or invalid" });
    }
  } else {
    // If no token is provided
    return res.status(401).json({ message: "No token attached to header" });
  }
});


const isAdmin = asyncHandler(async (req, res, next) => {
  // Make sure user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Check if the user has an admin role
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized as an admin" });
  }

  // If the user is an admin, proceed to the next middleware
  next();
});

module.exports = { authMiddleware, isAdmin };
