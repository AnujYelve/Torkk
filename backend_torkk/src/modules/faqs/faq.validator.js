const Joi = require("joi");
const AppError = require("../../utils/AppError");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return next(new AppError("Validation failed.", 422, error.details.map(d => d.message)));
  next();
};

const faqSchema = Joi.object({
  question: Joi.string().min(5).max(500).required(),
  answer: Joi.string().min(5).required(),
  category: Joi.string().max(100).optional().allow(""),
  displayOrder: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderSchema = Joi.object({
  order: Joi.array().items(
    Joi.object({ id: Joi.string().required(), displayOrder: Joi.number().integer().required() })
  ).min(1).required(),
});

module.exports = {
  validateCreateFAQ: validate(faqSchema),
  validateUpdateFAQ: validate(faqSchema.fork(["question", "answer"], s => s.optional()).min(1)),
  validateReorder: validate(reorderSchema),
};
