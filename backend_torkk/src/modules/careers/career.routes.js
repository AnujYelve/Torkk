const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const { uploadResume } = require("../../middlewares/upload.middleware");
const { authLimiter } = require("../../middlewares/rateLimiter");
const {
  validateCreateCareer,
  validateUpdateCareer,
  validateApplication,
  validateUpdateApplicationStatus,
} = require("./career.validator");
const ctrl = require("./career.controller");

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────
router.get("/", ctrl.getOpenCareers);
router.get("/:slug", ctrl.getCareerBySlug);
router.post("/:id/apply", authLimiter, uploadResume, validateApplication, ctrl.submitApplication);

module.exports = router;

// ─── Admin Router ─────────────────────────────────────────────
const adminRouter = express.Router();
adminRouter.use(protect);

// Applications (must be before /:id to avoid conflicts)
adminRouter.get("/applications", ctrl.getApplications);
adminRouter.get("/applications/:id", ctrl.getApplicationById);
adminRouter.patch("/applications/:id/status", authorize("SUPER_ADMIN", "ADMIN"), validateUpdateApplicationStatus, ctrl.updateApplicationStatus);

// Career CRUD
adminRouter.get("/", ctrl.getAllCareersAdmin);
adminRouter.get("/:id", ctrl.getCareerById);
adminRouter.post("/", authorize("SUPER_ADMIN", "ADMIN"), validateCreateCareer, ctrl.createCareer);
adminRouter.put("/:id", authorize("SUPER_ADMIN", "ADMIN"), validateUpdateCareer, ctrl.updateCareer);
adminRouter.delete("/:id", authorize("SUPER_ADMIN", "ADMIN"), ctrl.deleteCareer);
adminRouter.post("/:id/restore", authorize("SUPER_ADMIN", "ADMIN"), ctrl.restoreCareer);
adminRouter.patch("/:id/open", authorize("SUPER_ADMIN", "ADMIN"), ctrl.openCareer);
adminRouter.patch("/:id/close", authorize("SUPER_ADMIN", "ADMIN"), ctrl.closeCareer);

module.exports.adminRouter = adminRouter;
