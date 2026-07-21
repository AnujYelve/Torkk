/**
 * Environment variable validation and export.
 * All modules import from here — never from process.env directly.
 */

const requiredVars = [
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT) || 5000,

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",

  // Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,

  // Email
  COMPANY_EMAIL: process.env.COMPANY_EMAIL || "admin@torkkk.com",
  EMAIL_FROM: process.env.EMAIL_FROM || "noreply@torkkk.com",
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT) || 587,
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",

  // Uploads
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
  UPLOAD_PROVIDER: process.env.UPLOAD_PROVIDER || "local",

  // Seed
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL || "superadmin@torkkk.com",
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || "ChangeMe@2026!",
  SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME || "Super Admin",
};
