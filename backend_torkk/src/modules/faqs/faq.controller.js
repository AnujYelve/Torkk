const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const faqService = require("./faq.service");
const auditService = require("../audit/audit.service");

const getActiveFAQs = asyncHandler(async (req, res) => {
  const faqs = await faqService.getActiveFAQs(req.query);
  return sendResponse(res, 200, "FAQs retrieved.", faqs);
});

const getAllFAQsAdmin = asyncHandler(async (req, res) => {
  const result = await faqService.getAllFAQsAdmin(req.query);
  return sendResponse(res, 200, "All FAQs retrieved.", result.faqs, null, result.meta);
});

const getFAQById = asyncHandler(async (req, res) => {
  const faq = await faqService.getFAQById(req.params.id);
  return sendResponse(res, 200, "FAQ retrieved.", faq);
});

const createFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.createFAQ(req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CREATE_FAQ",
    faq.id,
    "FAQ",
    { question: faq.question }
  );

  return sendResponse(res, 201, "FAQ created.", faq);
});

const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.updateFAQ(req.params.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_FAQ",
    faq.id,
    "FAQ",
    req.body
  );

  return sendResponse(res, 200, "FAQ updated.", faq);
});

const deleteFAQ = asyncHandler(async (req, res) => {
  await faqService.deleteFAQ(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DELETE_FAQ_SOFT",
    req.params.id,
    "FAQ"
  );

  return sendResponse(res, 200, "FAQ deleted (soft delete).");
});

const restoreFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.restoreFAQ(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "RESTORE_FAQ",
    faq.id,
    "FAQ"
  );

  return sendResponse(res, 200, "FAQ restored successfully.", faq);
});

const reorderFAQs = asyncHandler(async (req, res) => {
  await faqService.reorderFAQs(req.body.order);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "REORDER_FAQS",
    null,
    "FAQ",
    { order: req.body.order }
  );

  return sendResponse(res, 200, "FAQs reordered.");
});

const activateFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.toggleFAQ(req.params.id, true);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "ACTIVATE_FAQ",
    faq.id,
    "FAQ"
  );

  return sendResponse(res, 200, "FAQ activated.", faq);
});

const deactivateFAQ = asyncHandler(async (req, res) => {
  const faq = await faqService.toggleFAQ(req.params.id, false);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DEACTIVATE_FAQ",
    faq.id,
    "FAQ"
  );

  return sendResponse(res, 200, "FAQ deactivated.", faq);
});

module.exports = {
  getActiveFAQs,
  getAllFAQsAdmin,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  restoreFAQ,
  reorderFAQs,
  activateFAQ,
  deactivateFAQ,
};
