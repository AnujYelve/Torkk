/**
 * File upload middleware using Multer.
 * Default: local disk storage (development fallback).
 * Production: swap diskStorage for cloud provider.
 */

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("../utils/AppError");
const { MAX_FILE_SIZE } = require("../config/env");

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Sub-folder by field name: uploads/resumes/, uploads/images/
    const folder = file.fieldname === "resume" ? "resumes" : "images";
    const dest = path.join(uploadDir, folder);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req, file, cb) => {
  const allowedTypes =
    file.fieldname === "resume"
      ? ALLOWED_RESUME_TYPES
      : ALLOWED_IMAGE_TYPES;

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// Pre-configured upload instances
const uploadImage = upload.single("image");
const uploadFeaturedImage = upload.single("featuredImage");
const uploadCoverImage = upload.single("coverImage");
const uploadResume = upload.single("resume");

// Middleware wrapper that converts multer errors to AppError
const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE") {
      return next(
        new AppError(`File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB`, 400)
      );
    }
    return next(err);
  });
};

module.exports = {
  upload,
  uploadImage: handleUpload(uploadImage),
  uploadFeaturedImage: handleUpload(uploadFeaturedImage),
  uploadCoverImage: handleUpload(uploadCoverImage),
  uploadResume: handleUpload(uploadResume),
};
