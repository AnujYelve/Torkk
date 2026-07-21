const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const contactService = require("./contact.service");

// POST /api/contact
const submitContact = asyncHandler(async (req, res) => {
  const result = await contactService.submitContact(req.body);
  return sendResponse(res, 201, "Message sent successfully. We'll get back to you soon.", result);
});

// Admin
const getSubmissions = asyncHandler(async (req, res) => {
  const result = await contactService.getSubmissions(req.query);
  return sendResponse(res, 200, "Submissions retrieved.", result.submissions, null, result.meta);
});

const getSubmissionById = asyncHandler(async (req, res) => {
  const submission = await contactService.getSubmissionById(req.params.id);
  return sendResponse(res, 200, "Submission retrieved.", submission);
});

const updateSubmission = asyncHandler(async (req, res) => {
  const submission = await contactService.updateSubmission(req.params.id, req.body);
  return sendResponse(res, 200, "Submission updated.", submission);
});

const deleteSubmission = asyncHandler(async (req, res) => {
  await contactService.deleteSubmission(req.params.id);
  return sendResponse(res, 200, "Submission deleted.");
});

module.exports = { submitContact, getSubmissions, getSubmissionById, updateSubmission, deleteSubmission };
