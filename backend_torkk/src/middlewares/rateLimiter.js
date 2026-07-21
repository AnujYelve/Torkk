const rateLimit = require("express-rate-limit");

// Strict limiter for auth routes (login, register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
    data: null,
    errors: null,
  },
});

// General limiter for all other API routes
const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
    data: null,
    errors: null,
  },
});

module.exports = { authLimiter, generalLimiter };
