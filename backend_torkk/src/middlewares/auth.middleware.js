/**
 * Authentication middleware for Admin CMS.
 * Verifies JWT from Authorization header or HTTP-only cookie.
 * Attaches the admin record to req.admin.
 */

const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const prisma = require("../config/prisma");
const { JWT_ACCESS_SECRET } = require("../config/env");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2. Fallback to HTTP-only cookie
  else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401)
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(
        new AppError("Your session has expired. Please log in again.", 401)
      );
    }
    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  // Fetch admin from DB
  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
    },
  });

  if (!admin) {
    return next(
      new AppError("The admin account belonging to this token no longer exists.", 401)
    );
  }

  if (!admin.isActive) {
    return next(
      new AppError("Your account has been deactivated. Please contact support.", 403)
    );
  }

  req.admin = admin;
  next();
});

module.exports = { protect };
