const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return next(new AppError("Validation failed.", 422, error.details.map(d => d.message)));
  next();
};

const pressSchema = Joi.object({
  title: Joi.string().min(3).max(300).required(),
  slug: Joi.string().max(250).pattern(/^[a-z0-9-_]+$/).optional().allow(""),
  summary: Joi.string().max(600).optional().allow(""),
  content: Joi.string().optional().allow(""),
  coverImage: Joi.string().optional().allow("", null),
  publicationDate: Joi.date().optional().allow(null),
  externalLink: Joi.string().uri().optional().allow("", null),
  type: Joi.string().max(100).optional().allow(""),
  status: Joi.string().valid("DRAFT", "PUBLISHED", "ARCHIVED").default("DRAFT"),

  // SEO fields
  metaTitle: Joi.string().max(150).optional().allow("", null),
  metaDescription: Joi.string().max(300).optional().allow("", null),
  canonicalUrl: Joi.string().uri().optional().allow("", null),
  ogImage: Joi.string().optional().allow("", null),
  keywords: Joi.array().items(Joi.string()).optional().default([]),
});

const updatePressSchema = pressSchema.fork(["title"], s => s.optional()).min(1);

module.exports = {
  validateCreatePress: validate(pressSchema),
  validateUpdatePress: validate(updatePressSchema),
};
