/**
 * Admin Authentication — Validation Schemas (Joi)
 */

const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return next(new AppError("Validation failed.", 422, messages));
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "any.required": "Password is required.",
  }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required.",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.min": "New password must be at least 8 characters.",
    "any.required": "New password is required.",
  }),
});

module.exports = {
  validateLogin: validate(loginSchema),
  validateChangePassword: validate(changePasswordSchema),
};
