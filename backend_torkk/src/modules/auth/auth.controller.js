const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const authService = require("./auth.service");
const auditService = require("../audit/audit.service");
const { NODE_ENV } = require("../../config/env");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("accessToken", result.accessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);

  // Write audit log
  await auditService.createLog(
    result.admin.id,
    result.admin.email,
    "LOGIN_SUCCESS",
    result.admin.id,
    "ADMIN"
  );

  return sendResponse(res, 200, "Login successful.", {
    admin: result.admin,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  if (req.admin) {
    await auditService.createLog(
      req.admin.id,
      req.admin.email,
      "LOGOUT",
      req.admin.id,
      "ADMIN"
    );
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return sendResponse(res, 200, "Logged out successfully.");
});

const getMe = asyncHandler(async (req, res) => {
  const admin = await authService.getCurrentAdmin(req.admin.id);
  return sendResponse(res, 200, "Admin profile retrieved.", admin);
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await authService.refreshAccessToken(refreshToken);

  res.cookie("accessToken", result.accessToken, { ...COOKIE_OPTIONS, maxAge: 15 * 60 * 1000 });

  return sendResponse(res, 200, "Token refreshed.", {
    accessToken: result.accessToken,
    admin: result.admin,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.admin.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CHANGE_PASSWORD",
    req.admin.id,
    "ADMIN"
  );

  return sendResponse(res, 200, "Password changed successfully.");
});

module.exports = { login, logout, getMe, refresh, changePassword };
