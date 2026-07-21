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

const featureSchema = Joi.object({
  icon: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const homepageSchema = Joi.object({
  heroTitle: Joi.string().min(2).max(200).optional(),
  heroSubtitle: Joi.string().max(500).optional().allow("", null),
  heroCtaText: Joi.string().max(50).optional().allow("", null),
  heroCtaLink: Joi.string().max(250).optional().allow("", null),
  bannerImageUrl: Joi.string().optional().allow("", null),
  features: Joi.array().items(featureSchema).optional().default([]),
});

module.exports = {
  validateUpdateHomepage: validate(homepageSchema),
};
