const asyncHandler = require("../../utils/asyncHandler");
const sendResponse = require("../../utils/sendResponse");
const careerService = require("./career.service");
const auditService = require("../audit/audit.service");
const path = require("path");

// ─── Public ───────────────────────────────────────────────────

const getOpenCareers = asyncHandler(async (req, res) => {
  const result = await careerService.getOpenCareers(req.query);
  return sendResponse(res, 200, "Job openings retrieved.", result.careers, null, result.meta);
});

const getCareerBySlug = asyncHandler(async (req, res) => {
  const career = await careerService.getCareerBySlug(req.params.slug);
  return sendResponse(res, 200, "Job posting retrieved.", career);
});

const submitApplication = asyncHandler(async (req, res) => {
  // Resume URL from upload middleware (if file was uploaded)
  let resumeUrl = null;
  if (req.file) {
    const relativePath = req.file.path.replace(process.cwd(), "").replace(/\\/g, "/");
    resumeUrl = relativePath;
  } else if (req.body.resumeUrl) {
    resumeUrl = req.body.resumeUrl;
  }

  const application = await careerService.submitApplication(
    req.params.id,
    req.body,
    resumeUrl
  );

  return sendResponse(res, 201, "Application submitted successfully.", {
    id: application.id,
    name: application.name,
    email: application.email,
  });
});

// ─── Admin ────────────────────────────────────────────────────

const getAllCareersAdmin = asyncHandler(async (req, res) => {
  const result = await careerService.getAllCareersAdmin(req.query);
  return sendResponse(res, 200, "All job postings retrieved.", result.careers, null, result.meta);
});

const getCareerById = asyncHandler(async (req, res) => {
  const career = await careerService.getCareerById(req.params.id);
  return sendResponse(res, 200, "Job posting retrieved.", career);
});

const createCareer = asyncHandler(async (req, res) => {
  const career = await careerService.createCareer(req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CREATE_CAREER",
    career.id,
    "CAREER",
    { title: career.title, slug: career.slug }
  );

  return sendResponse(res, 201, "Job posting created.", career);
});

const updateCareer = asyncHandler(async (req, res) => {
  const career = await careerService.updateCareer(req.params.id, req.body);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_CAREER",
    career.id,
    "CAREER",
    req.body
  );

  return sendResponse(res, 200, "Job posting updated.", career);
});

const deleteCareer = asyncHandler(async (req, res) => {
  await careerService.deleteCareer(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "DELETE_CAREER_SOFT",
    req.params.id,
    "CAREER"
  );

  return sendResponse(res, 200, "Job posting deleted (soft delete).");
});

const restoreCareer = asyncHandler(async (req, res) => {
  const career = await careerService.restoreCareer(req.params.id);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "RESTORE_CAREER",
    career.id,
    "CAREER"
  );

  return sendResponse(res, 200, "Job posting restored successfully.", career);
});

const openCareer = asyncHandler(async (req, res) => {
  const career = await careerService.toggleCareerStatus(req.params.id, true);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "OPEN_CAREER",
    career.id,
    "CAREER"
  );

  return sendResponse(res, 200, "Job posting opened.", career);
});

const closeCareer = asyncHandler(async (req, res) => {
  const career = await careerService.toggleCareerStatus(req.params.id, false);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "CLOSE_CAREER",
    career.id,
    "CAREER"
  );

  return sendResponse(res, 200, "Job posting closed.", career);
});

const getApplications = asyncHandler(async (req, res) => {
  const result = await careerService.getApplications(req.query);
  return sendResponse(res, 200, "Applications retrieved.", result.applications, null, result.meta);
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await careerService.getApplicationById(req.params.id);
  return sendResponse(res, 200, "Application retrieved.", application);
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await careerService.updateApplicationStatus(req.params.id, req.body.status);

  await auditService.createLog(
    req.admin.id,
    req.admin.email,
    "UPDATE_APPLICATION_STATUS",
    application.id,
    "CAREER_APPLICATION",
    { status: req.body.status }
  );

  return sendResponse(res, 200, "Application status updated.", application);
});

module.exports = {
  getOpenCareers,
  getCareerBySlug,
  submitApplication,
  getAllCareersAdmin,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  restoreCareer,
  openCareer,
  closeCareer,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
};
