const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const newsletterService = require("./newsletter.service");
const Joi = require("joi");
const AppError = require("../../utils/AppError");

const emailSchema = Joi.object({ email: Joi.string().email().required() });
const validateEmail = (req, res, next) => {
  const { error } = emailSchema.validate(req.body, { abortEarly: false });
  if (error) return next(new AppError("Validation failed.", 422, error.details.map(d => d.message)));
  next();
};

// POST /api/newsletter/subscribe
const subscribe = asyncHandler(async (req, res) => {
  const subscriber = await newsletterService.subscribe(req.body.email);
  return sendResponse(res, 201, "Subscribed successfully!", { id: subscriber.id, email: subscriber.email });
});

// POST /api/newsletter/unsubscribe
const unsubscribe = asyncHandler(async (req, res) => {
  await newsletterService.unsubscribe(req.body.email);
  return sendResponse(res, 200, "Unsubscribed successfully.");
});

// Admin
const getSubscribers = asyncHandler(async (req, res) => {
  const result = await newsletterService.getSubscribers(req.query);
  return sendResponse(res, 200, "Subscribers retrieved.", result.subscribers, null, result.meta);
});

const deleteSubscriber = asyncHandler(async (req, res) => {
  await newsletterService.deleteSubscriber(req.params.id);
  return sendResponse(res, 200, "Subscriber deleted.");
});

module.exports = { subscribe, unsubscribe, getSubscribers, deleteSubscriber, validateEmail };
