const express = require("express");
const { authLimiter } = require("../../middlewares/rateLimiter");
const { protect } = require("../../middlewares/auth.middleware");
const { validateLogin, validateChangePassword } = require("./auth.validator");
const ctrl = require("./auth.controller");

const router = express.Router();

// Public routes (rate limited)
router.post("/login", authLimiter, validateLogin, ctrl.login);
router.post("/refresh", ctrl.refresh);

// Protected routes
router.use(protect);
router.get("/me", ctrl.getMe);
router.post("/logout", ctrl.logout);
router.put("/change-password", validateChangePassword, ctrl.changePassword);

module.exports = router;
