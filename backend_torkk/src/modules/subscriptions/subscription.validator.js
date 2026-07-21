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

const createPlanSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().valid("DAILY", "WEEKLY", "MONTHLY", "ANNUAL").default("MONTHLY"),
  price: Joi.number().min(0).required(),
  billingCycleDays: Joi.number().integer().min(1).optional(),
  ridesLimit: Joi.number().integer().min(0).optional().allow(null),
  isUnlimited: Joi.boolean().default(false),
  features: Joi.array().items(Joi.string()).optional().default([]),
  description: Joi.string().optional().allow("", null),
  discountPercent: Joi.number().min(0).max(100).optional().default(0),
  isActive: Joi.boolean().default(true),
  sortOrder: Joi.number().integer().optional().default(0),
});

const updatePlanSchema = createPlanSchema.fork(
  ["name", "price"],
  (schema) => schema.optional()
).min(1);

module.exports = {
  validateCreatePlan: validate(createPlanSchema),
  validateUpdatePlan: validate(updatePlanSchema),
};
