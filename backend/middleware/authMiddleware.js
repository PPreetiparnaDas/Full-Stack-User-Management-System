// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // same secret as in authController.js

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  // Expecting: Bearer <token>
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info (id, email, etc.)
    next(); // continue to the route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
