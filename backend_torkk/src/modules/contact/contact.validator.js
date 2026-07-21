/**
 * Contact — Full Module (validator, service, controller, routes)
 */

// ─── validator ────────────────────────────────────────────────

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

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Name must be at least 2 characters long.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  phone: Joi.string().allow("", null).optional(),
  subject: Joi.string().allow("", null).optional(),
  message: Joi.string().min(5).max(2000).required().messages({
    "string.min": "Message must be at least 5 characters long.",
    "any.required": "Message is required.",
  }),
  inquiryType: Joi.string().allow("", null).optional(),
});

const validateContact = validate(contactSchema);

module.exports = { validateContact };
