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

const createCareerSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  department: Joi.string().max(100).optional().allow(""),
  location: Joi.string().max(100).optional().allow(""),
  employmentType: Joi.string().max(100).optional().allow(""),
  experience: Joi.string().max(100).optional().allow(""),
  description: Joi.string().min(10).required(),
  requirements: Joi.string().optional().allow(""),
  responsibilities: Joi.string().optional().allow(""),
  status: Joi.string().valid("OPEN", "CLOSED").default("OPEN"),
});

const updateCareerSchema = createCareerSchema.fork(
  ["title", "description"],
  (schema) => schema.optional()
).min(1);

const applicationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional().allow(""),
  resumeUrl: Joi.string().max(1000).optional().allow(""),
  coverLetter: Joi.string().max(2000).optional().allow(""),
}).unknown(true);

const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid("NEW", "REVIEWING", "SHORTLISTED", "REJECTED").required(),
});

module.exports = {
  validateCreateCareer: validate(createCareerSchema),
  validateUpdateCareer: validate(updateCareerSchema),
  validateApplication: validate(applicationSchema),
  validateUpdateApplicationStatus: validate(updateApplicationStatusSchema),
};
