/**
 * Global error handling middleware.
 * Handles known Prisma errors, JWT errors, validation errors, and generic errors.
 */

const AppError = require("../utils/AppError");
const sendResponse = require("../utils/sendResponse");

// ─── Prisma Error Handlers ───────────────────────────────────

const handlePrismaNotFound = () =>
  new AppError("Resource not found.", 404);

const handlePrismaUniqueConstraint = (err) => {
  const field = err.meta?.target?.[0] || "field";
  return new AppError(`${field} already exists.`, 409);
};

const handlePrismaForeignKey = () =>
  new AppError("Related resource not found.", 400);

const handlePrismaValidation = () =>
  new AppError("Invalid data provided.", 422);

// ─── JWT Error Handlers ──────────────────────────────────────

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your session has expired. Please log in again.", 401);

// ─── Main Error Handler ──────────────────────────────────────

const errorHandler = (err, req, res, next) => {
  let error = Object.assign(
    new AppError(err.message, err.statusCode || 500),
    err
  );

  // Prisma errors
  if (err.code === "P2025") error = handlePrismaNotFound();
  if (err.code === "P2002") error = handlePrismaUniqueConstraint(err);
  if (err.code === "P2003") error = handlePrismaForeignKey();
  if (err.code === "P2007") error = handlePrismaValidation();

  // JWT errors
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  // Joi validation errors
  if (err.isJoi) {
    error = new AppError(
      "Validation failed.",
      422,
      err.details?.map((d) => d.message)
    );
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (statusCode >= 500) console.error(err.stack);
  }

  return sendResponse(res, statusCode, message, null, error.errors || null);
};

module.exports = errorHandler;
