/**
 * Admin Authentication — Service Layer
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { generateTokenPair, generateAccessToken } = require("../../utils/generateTokens");
const {
  JWT_REFRESH_SECRET,
  BCRYPT_ROUNDS,
} = require("../../config/env");

const login = async ({ email, password }) => {
  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!admin) throw new AppError("Invalid email or password.", 401);
  if (!admin.isActive) throw new AppError("Account deactivated. Contact support.", 403);

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isPasswordValid) throw new AppError("Invalid email or password.", 401);

  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  const tokens = generateTokenPair(admin);

  return {
    admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    ...tokens,
  };
};

const getCurrentAdmin = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  });
  if (!admin) throw new AppError("Admin not found.", 404);
  return admin;
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new AppError("Refresh token required.", 401);

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Invalid or expired refresh token.", 401);
  }

  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });

  if (!admin || !admin.isActive) throw new AppError("Admin account not found or deactivated.", 401);

  const accessToken = generateAccessToken({ id: admin.id, email: admin.email, role: admin.role });
  return { accessToken, admin };
};

const changePassword = async (adminId, { currentPassword, newPassword }) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw new AppError("Admin not found.", 404);

  const isValid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!isValid) throw new AppError("Current password is incorrect.", 400);
  if (currentPassword === newPassword) throw new AppError("New password must be different from the current password.", 400);

  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await prisma.admin.update({ where: { id: adminId }, data: { passwordHash } });
  return true;
};

module.exports = { login, getCurrentAdmin, refreshAccessToken, changePassword };
