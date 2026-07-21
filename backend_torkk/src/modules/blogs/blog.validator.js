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

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  slug: Joi.string().max(250).pattern(/^[a-z0-9-_]+$/).optional().allow(""),
  excerpt: Joi.string().max(500).optional().allow(""),
  content: Joi.string().min(10).required(),
  featuredImage: Joi.string().optional().allow("", null),
  author: Joi.string().min(2).max(100).required(),
  category: Joi.string().max(100).optional().allow(""),
  tags: Joi.array().items(Joi.string()).optional().default([]),
  status: Joi.string().valid("DRAFT", "PUBLISHED", "ARCHIVED").default("DRAFT"),
  publishedAt: Joi.date().optional().allow(null),

  // SEO fields
  metaTitle: Joi.string().max(150).optional().allow("", null),
  metaDescription: Joi.string().max(300).optional().allow("", null),
  canonicalUrl: Joi.string().uri().optional().allow("", null),
  ogImage: Joi.string().optional().allow("", null),
  keywords: Joi.array().items(Joi.string()).optional().default([]),
});

const updateBlogSchema = createBlogSchema.fork(
  ["title", "content", "author"],
  (schema) => schema.optional()
).min(1);

module.exports = {
  validateCreateBlog: validate(createBlogSchema),
  validateUpdateBlog: validate(updateBlogSchema),
};
