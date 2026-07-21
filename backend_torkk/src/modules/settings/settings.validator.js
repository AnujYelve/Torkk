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

const settingsSchema = Joi.object({
  companyName: Joi.string().min(2).max(100).optional(),
  supportEmail: Joi.string().optional().allow("", null),
  supportPhone: Joi.string().max(30).optional().allow("", null),
  address: Joi.string().max(250).optional().allow("", null),
  socialFacebook: Joi.string().optional().allow("", null),
  socialTwitter: Joi.string().optional().allow("", null),
  socialInstagram: Joi.string().optional().allow("", null),
  socialLinkedin: Joi.string().optional().allow("", null),
  appStoreIos: Joi.string().optional().allow("", null),
  playStoreAndroid: Joi.string().optional().allow("", null),
  logoUrlLight: Joi.string().optional().allow("", null),
  logoUrlDark: Joi.string().optional().allow("", null),
  faviconUrl: Joi.string().optional().allow("", null),
  customJson: Joi.object().optional(),
});

module.exports = {
  validateUpdateSettings: validate(settingsSchema),
};
